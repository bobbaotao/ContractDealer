<template>
  <el-row>
  <!-- <el-dialog
        title="New Contract Dealer"
        :visible.sync="dialogVisible"
        size="large">
        <DealerInvite v-on:close="dialogVisible = false"
                      v-on:inviteDealerSuccess="inviteDealerSuccess"></DealerInvite>
  </el-dialog> -->
    <el-col :span="22" :offset="1">
      <el-row class="topNav">
        <TopNav v-bind:activeIndex="navKey">
        </TopNav>
      </el-row>
      <!-- <el-row class="smallRow">
        <el-col style="text-align:left">
          <el-button size="small" type="primary" v-on:click="dialogVisible = true">
            Invite Dealer
          </el-button>
        </el-col>
      </el-row> -->
      <el-row>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="All" name="first">
            <DealerList v-bind:initData="allCDData" v-bind:dealerType="'2'"></DealerList>
          </el-tab-pane>
          <el-tab-pane label="Not Submitted" name="second">
            <DealerList v-bind:initData="notSubmitCDData" v-bind:dealerType="'2'"></DealerList>
          </el-tab-pane>
          <el-tab-pane label="In Process" name="third">
            <DealerList v-bind:initData="inProcessCDData" v-bind:dealerType="'2'"></DealerList>
          </el-tab-pane>
          <el-tab-pane label="Approved" name="fourth">
            <DealerList v-bind:initData="approvedCDData" v-bind:dealerType="'2'"></DealerList>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import defaultData from '../defaultData';
  import { Loading } from 'element-ui';
  import DealerList from './DealerList';
  import TopNav from './TopNav';
  var array = require('array');
  import DealerInvite from './DealerInvite';

  export default {
    name: "ZeissHomePage",
    data () {
      return {
        cdServiceUrl: defaultData.cdServiceUrl,
        allCDData: null,
        notSubmitCDData: null,
        inProcessCDData: null,
        approvedCDData: null,
        activeName: 'first',
        navKey: 'MyCD',
        dialogVisible: false
      }
    },
    components: { DealerList, TopNav, DealerInvite},
    created: function() {
      this.LoadContractDealersFromServer();
    },
    methods: {
      ShowLoadingView: function() {
        Loading.service({ fullscreen: true });
      },
      HideLoadingView: function() {
        let curLoadingInstance = Loading.service({ fullscreen: true });
        curLoadingInstance.close();
      },
      inviteDealerSuccess: function() {
        this.dialogVisible = false;
        this.LoadContractDealersFromServer();
      },
      LoadContractDealersFromServer: function() {
        var requestUrl = this.cdServiceUrl + "/LoadAllContractDealerByCurrentUser/2";
        this.ShowLoadingView();
        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.data.GetContractDealerListByCurrentUserResult.Status == "success") {
            this.allCDData = response.data.GetContractDealerListByCurrentUserResult.Data;
            this.notSubmitCDData = null;
            this.inProcessCDData = null;
            this.approvedCDData = null;
            if(this.allCDData && this.allCDData.length > 0) {
              var nsArr = new array();
              var ipArr = new array();
              var adArr = new array();
              for(var key in this.allCDData)
              {
                  var item = this.allCDData[key];
                  if(item.dealerStatus == "0" || item.dealerStatus == "1"
                  || item.ieacStatus == "0" || item.ieacStatus == "1")
                  {
                    nsArr.push(item);
                  } else if (item.dealerStatus == "2") {
                    ipArr.push(item);
                  } else {
                    adArr.push(item);
                  }
              }
              this.notSubmitCDData = nsArr.toArray();
              this.inProcessCDData = ipArr.toArray();
              this.approvedCDData = adArr.toArray();
            }
          } else {
            this.$message.error(response.data.GetContractDealerListByCurrentUserResult.Message);
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      }
    }
  }
</script>

<style scoped>
.topNav {

}
.smallRow {
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>

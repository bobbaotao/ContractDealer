<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <el-row class="topNav">
        <TopNav v-bind:activeIndex="navKey">
        </TopNav>
      </el-row>
      <el-row>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="All" name="first">
            <DealerList v-bind:initData="allACData" v-bind:dealerType="'3'"></DealerList>
          </el-tab-pane>
          <el-tab-pane label="Not Submitted" name="second">
            <DealerList v-bind:initData="notSubmitACData" v-bind:dealerType="'3'"></DealerList>
          </el-tab-pane>
          <el-tab-pane label="In Process" name="third">
            <DealerList v-bind:initData="inProcessACData" v-bind:dealerType="'3'"></DealerList>
          </el-tab-pane>
          <el-tab-pane label="Approved" name="fourth">
            <DealerList v-bind:initData="approvedACData" v-bind:dealerType="'3'"></DealerList>
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

  export default {
    name: "ACDealerPage",
    data () {
      return {
        cdServiceUrl: defaultData.cdServiceUrl,
        allACData: null,
        notSubmitACData: null,
        inProcessACData: null,
        approvedACData: null,
        activeName: 'first',
        navKey: 'AllAC'
      }
    },
    components: { DealerList, TopNav},
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
      LoadContractDealersFromServer: function() {
        var requestUrl = this.cdServiceUrl + "/LoadAllContractDealer/3";
        this.ShowLoadingView();
        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.data.GetContractDealerListResult.Status == "success") {
            this.allACData = response.data.GetContractDealerListResult.Data;
            this.notSubmitACData = null;
            this.inProcessACData = null;
            this.approvedACData = null;
            if(this.allACData && this.allACData.length > 0) {
              var nsArr = new array();
              var ipArr = new array();
              var adArr = new array();
              for(var key in this.allACData)
              {
                  var item = this.allACData[key];
                  if(item.dealerStatus == "0" || item.dealerStatus == "1")
                  {
                    nsArr.push(item);
                  } else if (item.dealerStatus == "2" || item.isNeedACApproval > 0) {
                    ipArr.push(item);
                  } else {
                    adArr.push(item);
                  }
              }
              this.notSubmitACData = nsArr.toArray();
              this.inProcessACData = ipArr.toArray();
              this.approvedACData = adArr.toArray();
            }
          } else {
            this.$message.error(response.data.GetContractDealerListResult.Message);
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
</style>

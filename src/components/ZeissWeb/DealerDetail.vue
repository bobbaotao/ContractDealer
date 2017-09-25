<template>
  <el-row class="mainDiv">
    <el-col :span="22" :offset="1">
      <el-row class="topNav">
        <el-col>
          <TopNav v-on:activeIndex="navKey">
          </TopNav>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="text-align:left;">
          <span class="sectionTitle">{{dealerSummaryInfo.companyName}}</span><br />
          <span class="sectionDetail">经销商是否已提交信息表：{{GetStatus(dealerSummaryInfo.dealerStatus)}}</span><br />
          <span class="sectionDetail">经销商是否已提交相关公司信息：{{GetMappingStatus(dealerSummaryInfo.ieacStatus)}}</span><br />
          <span class="sectionDetail">外网经销商系统用户名：{{dealerSummaryInfo.username}}</span><br />
          <span class="sectionDetail">外网经销商系统邮件地址：{{dealerSummaryInfo.email}}</span><br />
        </el-col>
        <el-col :span="8" :offset="8" style="text-align:left;">
          <span class="sectionDetail">Divison/Region：{{dealerSummaryInfo.division}} / {{dealerSummaryInfo.salesRegion}}</span><br />
          <span class="sectionDetail">Sales：{{dealerSummaryInfo.sales}}</span><br />
          <span class="sectionDetail">Coordinator：{{dealerSummaryInfo.coordinator}}</span><br />
        </el-col>
      </el-row>
      <el-row style="padding-top:5px; padding-bottom:5px;">
        <el-col :span="4" :offset="1">
          <el-button :disabled = " !approvalInfo.IsAllowCurrentUserStartSIWF"
                      v-on:click="StartSIWF" type="primary" size="small">
            启动自我声明表审批
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="Dealer Info" name="first">
              <DealerInfo v-if="dealerInfoData != null"
                          :dealerInfoData="dealerInfoData"
                          :dealerInfoDocData="dealerInfoDocData">
              </DealerInfo>
              <span v-else>
                该供应商尚未提交信息表
              </span>
            </el-tab-pane>
            <el-tab-pane label="IE Company & Affiliated Company" name="second">
              <ACIEView v-if="(ieCompanyData != null &&  ieCompanyData.length && ieCompanyData.length > 0) || (acDealerData != null && acDealerData.length && acDealerData.length > 0)"
                        :ieCompanyData="ieCompanyData" :acDealerData="acDealerData">
              </ACIEView>
              <span v-else>
                改供应商尚未提交关联公司以及进出口公司
              </span>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row>
        //TOD Task info
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import TopNav from './TopNav';
  import defaultData from '../defaultData';
  import { Loading } from 'element-ui';
  import DealerInfo from './DealerInfo';
  import ACIEView from './ACIEView';
  var array = require('array');

  export default {
    name: 'DealerDetail',
    data () {
      return {
        navKey: '1',
        dealerId: '',
        activeName: 'first',
        dealerInfoData: null,
        dealerInfoDocData: null,
        acDealerData: null,
        ieCompanyData: null,
        approvalInfo: {
          CurTasks: null,
          IsAllowCurrentUserApprove: false,
          IsAllowCurrentUserStartSIWF: false,
          SelfInfoWFStatus: "1"
        },
        dealerSummaryInfo: {
                companyName: "",
                coordinator: "",
                dealerID: "",
                dealerStatus: "",
                division: "",
                email: "",
                ieacStatus: "",
                sales: "",
                salesRegion: "",
                username: ""
        }
      }
    },
    components: {TopNav,DealerInfo,ACIEView},
    watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
        if(this.$route.params && this.$route.params.dealerId) {
          this.dealerId = this.$route.params.dealerId;
          this.activeName = "first";
          this.LoadDealerDetailFromServer();
        } else {
          this.$message.error("no dealer id!");
        }
      }
    },
    created: function() {
      if(this.$route.params && this.$route.params.dealerId) {
        this.dealerId = this.$route.params.dealerId;
        this.LoadDealerDetailFromServer();
      } else {
        this.$message.error("no dealer id!");
      }
    },
    methods:{
      ShowLoadingView: function() {
        Loading.service({ fullscreen: true });
      },
      HideLoadingView: function() {
        let curLoadingInstance = Loading.service({ fullscreen: true });
        curLoadingInstance.close();
      },
      LoadDealerDetailFromServer: function() {
        var requestUrl = defaultData.cdServiceUrl +  "/LoadContractDealerDetail/" + this.dealerId;
        this.ShowLoadingView();
        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.data && response.data.GetContractDetailDetailResult
            && response.data.GetContractDetailDetailResult.Status == "success")
            {
              var responseData = response.data.GetContractDetailDetailResult.Data;
              this.dealerInfoData = responseData.DealerInfo;
              this.dealerInfoDocData = responseData.DealerFileInfo;
              this.approvalInfo = responseData.ApprovalInfos;
              this.acDealerData = responseData.ACDealers;
              if(responseData.SummaryInfo != null) {
               this.dealerSummaryInfo =  responseData.SummaryInfo;
             }
              //this.ieCompanyData = responseData.IECompanys;
              this.ieCompanyData = [];
              if(responseData.IECompanys && responseData.IECompanys.length && responseData.IECompanys.length > 0)
              {
                var ieCompanyArr = new array();
                for(var resKey in responseData.IECompanys) {
                  var resCompanyInfo = responseData.IECompanys[resKey];
                  ieCompanyArr.push(defaultData.getZeissIEItemFromServerData(resCompanyInfo));
                }
                this.ieCompanyData = ieCompanyArr.toArray();
              }
            } else {
              this.$message.error(response.data.GetContractDetailDetailResult.Message);
            }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      StartSIWF: function() {
        var requestUrl = defaultData.cdServiceUrl +  "/StartWF/" + this.dealerId + "/ContractDealerInfos";
        this.ShowLoadingView();
        this.axios.post(requestUrl).then((response) => {
            this.HideLoadingView();
            if(response.data && response.data.StartWorkflowResult) {
              if(response.data.StartWorkflowResult.Status == "success")
              {
                this.$alert('流程启动成功', 'Success', {
                    confirmButtonText: '关闭',
                    callback: action => {
                      this.LoadDealerDetailFromServer();
                    }
                  });
              } else {
                this.$message.error(response.data.StartWorkflowResult.Message);
              }
            }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      GetStatus: function(value) {
        switch (value) {
          case "0":
            return "未完成注册";
          case "1":
            return "未提交信息表";
          case "2":
            return "审核中";
          case "3":
            return "审核通过";
          default:
            return "未完成注册";
        }
      },
      GetMappingStatus: function(value) {
        switch (value) {
          case "0":
            return "未提交审核";
          case "1":
            return "未提交审核";
          case "2":
            return "审核中";
          case "3":
            return "审核通过";
          default:
            return "未提交审核";
        }
      }
    }
  }
</script>

<style scoped="scoped">
.sectionTitle {
  color: rgba(107, 145, 188);
  font-size: 16px;
  line-height: 24px;
  padding: 3px 3px 12px 3px;
  text-align: left;
}
.sectionDetail {
  font-size: 12px;
  line-height: 16px;
  padding: 3px 3px 3px 3px;
  text-align: left;
}
</style>

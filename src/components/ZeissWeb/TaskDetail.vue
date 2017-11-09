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
        <el-col :span="12" style="text-align:left">
          <!-- <el-button  :disabled = " !approvalInfo.IsAllowCurrentUserStartSIWF"
                      v-on:click="StartSIWF" type="primary" size="small">
            启动自我声明表审批
          </el-button> -->
          <el-button  :disabled = "!approvalInfo.IsAllowCurrentUserStartSIWF" v-if="dealerSummaryInfo.dealerType == '2'"
                      v-on:click="StartSIWF" type="primary" size="small">
            启动自我声明表审批
          </el-button>
          <el-button  :disabled = "!approvalInfo.IsAllowCurrentUserStartSIWF" v-if="dealerSummaryInfo.dealerType == '2'"
                      v-on:click="ValidateDealerInfo('INACTIVE')" type="primary" size="small">
            退回供应商信息表
          </el-button>
          <el-button  v-if="dealerSummaryInfo.dealerType != '2' "
                    v-on:click="ValidateDealerInfo('ACTIVE')" type="primary" size="small"
                  :disabled="!approvalInfo.IsAllowCurrentUserStartSIWF || dealerSummaryInfo.dealerStatus != '2'">
            核实信息表
          </el-button>
          <el-button  v-if="dealerSummaryInfo.dealerType != '2'"
                    v-on:click="ValidateDealerInfo('INACTIVE')" type="primary" size="small"
                  :disabled="!approvalInfo.IsAllowCurrentUserStartSIWF  || dealerSummaryInfo.dealerStatus == '1'">
            退回供应商信息表
          </el-button>
        </el-col>
        <el-col :span="8"  :offset="4">
          <FileManager :FileName="legalFileName" :fileID="legalFileID" :dealerId="dealerId"
                        :AllowUpload="isLegalUser" v-on:ReloadDealerInfo="ResetFileInfo">
          </FileManager>
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
            <el-tab-pane label="IE Company & Affiliated Company" name="second" v-if="dealerSummaryInfo.dealerType == '2'">
              <ACIEView v-if="(ieCompanyData != null &&  ieCompanyData.length && ieCompanyData.length > 0) || (acDealerData != null && acDealerData.length && acDealerData.length > 0)"
                        :ieCompanyData="ieCompanyData" :acDealerData="acDealerData"
                        :allowApproval="taskID != ''" v-on:approve="handleMappingApproval">
              </ACIEView>
              <span v-else>
                改供应商尚未提交关联公司以及进出口公司
              </span>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <ApprovalView v-bind:ApprovalInfos="approvalInfo" v-bind:taskID="taskID"
                        v-on:approveTask="ValidateACDealerMapping"
                        v-on:ApprovedSuccess="Reload">
          </ApprovalView>
        </el-col>
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
  import ApprovalView from './ApprovalView';
  import FileManager from './FileManager';

  var array = require('array');

  export default {
    name: 'TaskDetail',
    data () {
      return {
        navKey: '1',
        dealerId: '',
        activeName: 'first',
        taskID: '',
        dealerInfoData: null,
        dealerInfoDocData: null,
        acDealerData: null,
        ieCompanyData: null,
        legalFileName: '',
        legalFileID: '',
        legalFileList: null,
        isLegalUser: false,
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
                username: "",
                dealerType: ""
        }
      }
    },
    components: {TopNav, DealerInfo, ACIEView, ApprovalView,FileManager},
    watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
        if(this.$route.params && this.$route.params.dealerId && this.$route.params.taskId) {
          this.taskID = this.$route.params.taskId;
          this.dealerId = this.$route.params.dealerId;
          this.activeName = "first";
          this.LoadDealerDetailFromServer();
        } else {
          this.$message.error("no dealer id or task id!");
        }
      }
    },
    created: function() {
      //this.test();
      if(this.$route.params && this.$route.params.dealerId && this.$route.params.taskId) {
        this.taskID = this.$route.params.taskId;
        this.dealerId = this.$route.params.dealerId;
        this.activeName = "first";
        this.LoadDealerDetailFromServer();
      } else {
        this.$message.error("no dealer id or task id!");
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
      Reload: function() {
        this.$router.push({name: 'DealerDetail', params: {dealerId: this.dealerId}});
      },
      ValidateACDealerMapping(requestParam) {
        if(this.acDealerData && this.acDealerData.length > 0) {
          for(var key in this.acDealerData) {
            var item = this.acDealerData[key];
            if(item.MappingStatus == "1" || item.MappingStatus == "0") {
              this.$confirm('尚有关联公司关联关系未被审批, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                          }).then(() => {
                            this.ApproveTask(requestParam);
                          }).catch(() => {

                          });
              return;
            }
          }
        }
          this.ApproveTask(requestParam);
      },
      ApproveTask: function(requestParam) {

        var requestUrl = defaultData.cdServiceUrl + "/ApproveTask";
        this.ShowLoadingView();

        this.axios.post(requestUrl,requestParam).then((response) => {
          this.HideLoadingView();
          if(response.status == '200' && response.data) {
              if(response.data.ApproveTaskResult && response.data.ApproveTaskResult.Status == "success") {
                this.$alert('操作成功！', 'Success', {
                    confirmButtonText: '关闭',
                    callback: action => {
                        //this.$emit('ApprovedSuccess');
                        this.Reload();
                    }
                  });
              } else {
                this.$message.error(response.data.ApproveTaskResult.Message);
              }
            } else {
            this.$message.error(response.status);
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });

      },
      ResetFileInfo: function(fileID, fileName) {
        this.legalFileID = fileID;
        this.legalFileName = fileName;
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

              this.isLegalUser = responseData.IsLegalUser;
              //set legal file
              if(responseData.LegalFiles && responseData.LegalFiles.length > 0)
              {
                this.legalFileName = responseData.LegalFiles[0].FileName;
                this.legalFileID = responseData.LegalFiles[0].FileID;
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
      ValidateDealerInfo: function(status) {
        var requestUrl = defaultData.cdServiceUrl +  "/ValidateACDealerInfo/" + this.dealerId + "/" + status;
        this.ShowLoadingView();
        this.axios.post(requestUrl).then((response) => {
            this.HideLoadingView();
            if(response.data && response.data.ValidateACDealerInfoResult) {
              if(response.data.ValidateACDealerInfoResult.Status == "success")
              {
                this.$alert('操作成功！', 'Success', {
                    confirmButtonText: '关闭',
                    callback: action => {
                      this.LoadDealerDetailFromServer();
                    }
                  });
              } else {
                this.$message.error(response.data.ValidateACDealerInfoResult.Message);
              }
            }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },

      handleMappingApproval: function(mappingValue, status) {
        var requestUrl = defaultData.cdServiceUrl +  "/ApproveDealerMapping"; //"/" + value.MappingId + "/";
        if(status == "Reject") {
          this.$confirm('Please input comments', 'Comments', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Close',
              showInput: true
            }).then(({ value }) => {
              var requestParam = {
                  taskParams: {
                    TaskID : mappingValue.MappingId,
                    TaskStatus : "3",
                    Comments : value
                  }
                };
                this.ApproveACDealer(requestUrl, requestParam);
            }).catch(() => {

            });

        } else if (status == "Approve") {
          var requestParam = {
              taskParams: {
              TaskID : value.MappingId,
              TaskStatus : "2",
              Comments : ""
            }
          };
          this.ApproveACDealer(requestUrl, requestParam);
        }
      },
      ApproveACDealer: function(requestUrl, requestParam) {
        this.ShowLoadingView();

        this.axios.post(requestUrl, requestParam).then((response) => {
          this.HideLoadingView();
          //TODO
          if(response.status == "200" && response.data.ApproveDealerMappingResult.Status == "success")
          {
            this.$message("Action success!");
            this.LoadACDealerInfoFromServer();
          } else if (response.status == "200"){
            this.$message.error(response.data.ApproveDealerMappingResult.Message);
          } else {
            this.$message.error(response.message);
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      LoadACDealerInfoFromServer: function() {
        var requestUrl = defaultData.cdServiceUrl +  "/LoadACDealerInfo/" + this.dealerId;
        this.ShowLoadingView();

        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          //TODO
          if(response.status == "200" && response.data.LoadACDealerInfoResult.Status == "success")
          {
            this.acDealerData = response.data.LoadACDealerInfoResult.Data;
          } else if (response.status == "200") {
              this.$message.error(response.data.LoadACDealerInfoResult.Message);
          } else {
            this.$message.error(response.message);
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(errr.message);
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
      ,
      test: function() {
        this.approvalInfo = {
                CurTasks: [
                    {
                        Approver: "Bao Tao",
                        ApproverAccount: "ZCTAOBAO",
                        Comments: "start approval process on 9/25/2017 3:44:59 PM",
                        Created: "",
                        Modified: "",
                        TaskConfigId: -1,
                        TaskId: 13,
                        TaskStatus: "3",
                        WFId: 5,
                        dealer_id: "dcd7b276-9815-4430-994e-fd317919dc05",
                        order: 0
                    },
                    {
                        Approver: "Bob",
                        ApproverAccount: "zctaobao",
                        Comments: null,
                        Created: "",
                        Modified: "",
                        TaskConfigId: 1,
                        TaskId: 14,
                        TaskStatus: "2",
                        WFId: 5,
                        dealer_id: "dcd7b276-9815-4430-994e-fd317919dc05",
                        order: 1
                    },
                    {
                        Approver: "Wells",
                        ApproverAccount: "zcwwang",
                        Comments: null,
                        Created: "",
                        Modified: "",
                        TaskConfigId: 2,
                        TaskId: 15,
                        TaskStatus: "3",
                        WFId: 5,
                        dealer_id: "dcd7b276-9815-4430-994e-fd317919dc05",
                        order: 1
                    }
                ],
                IsAllowCurrentUserApprove: true,
                IsAllowCurrentUserStartSIWF: false,
                SelfInfoWFStatus: "2"
            };
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

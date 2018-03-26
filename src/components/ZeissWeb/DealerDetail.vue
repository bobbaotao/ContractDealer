<template>
  <el-row class="mainDiv">
    <el-dialog
          title="Dealer Authorization Certificate"
          :visible.sync="dialogVisible"
          size="large">
          <DealerAuthCertMgr v-bind:dealerId="dealerId" v-on:close="dialogVisible = false"></DealerAuthCertMgr>
    </el-dialog>
    <el-dialog v-if="IsHaveRelatedDealer"
          title="Dealer Relationship"
          :visible.sync="relatedDialogVisible"
          size="large">
          <ACDealerApprovalList :allowApproval="isLegalUser" :listType="'BeRelatedList'"
                                :relatedDealerStatus="dealerSummaryInfo.dealerStatus"
                                :acDealerData="BeRelatedDealer" :relatedDealerName="dealerSummaryInfo.companyName"
                                v-on:acdealerapproval="handleMappingApproval">
          </ACDealerApprovalList>
    </el-dialog>
    <el-dialog title="Dealer Permission"
          :visible.sync="dpDialogVisible" size="large">
        <DealerPermission v-bind:DID="dealerId" v-bind:isAllowEdit="DPCheckResult.IsMasterOfCurDealer" 
          v-on:close="dpDialogVisible = false"></DealerPermission>
    </el-dialog>
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
        <el-col :span="15" style="text-align:left">
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
            启动信息表核实流程
          </el-button>
          <el-button  v-if="dealerSummaryInfo.dealerType != '2'"
                    v-on:click="ValidateDealerInfo('INACTIVE')" type="primary" size="small"
                  :disabled="!approvalInfo.IsAllowCurrentUserStartSIWF  || dealerSummaryInfo.dealerStatus == '1'">
            退回供应商信息表
          </el-button>
          <el-button type="primary" size="small" v-on:click="NavigateToApplication">
            经销商申请表
          </el-button>
          <!-- <a :href="'/_layouts/15/Zeiss.SpotDealer/NewApprovalForm.aspx?List=a1b6eb24-240e-43e3-b7c1-efd2668756c0&dealerguid=' + dealerId" _target="self">
            <el-button type="primary" size="small">
              发起项目审批流程
            </el-button>
          </a> -->
          <!-- commit at 2018/03/05, move this part to dealer file system
          <el-button type="primary" size="small" v-on:click="dialogVisible = true">
            管理经销商资格证
          </el-button> -->
          <el-button type="primary" size="small" v-if="IsHaveRelatedDealer" v-on:click="relatedDialogVisible = true">
            审核关联关系
          </el-button>
          <el-button size="small" v-if="dealerSummaryInfo.dealerType == '2' "
                     v-on:click="OpenDFPage">
            经销商归档
          </el-button>
          <el-button size="small" v-on:click="dpDialogVisible = true">
            管理权限
          </el-button>
        </el-col>
        <el-col :span="8" :offset="1">
          <FileManager :FileName="legalFileName" :fileID="legalFileID" :dealerId="dealerId"
                        :AllowUpload="isCurLegal" v-on:ReloadDealerInfo="ResetFileInfo">
          </FileManager>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="Dealer Info" name="first">
              <DealerInfo v-if="dealerInfoData != null"
                          v-bind:dealerInfoData="dealerInfoData"
                          v-bind:dealerInfoDocData="dealerInfoDocData">
              </DealerInfo>
              <span v-else>
                该供应商尚未提交信息表
              </span>
            </el-tab-pane>
            <el-tab-pane label="IE Company & Related Company" name="second" v-if="dealerSummaryInfo.dealerType == '2'">
              <ACIEView
                        :ieCompanyData="ieCompanyData" :acDealerData="acDealerData"
                        :allowApproval="isLegalUser" v-on:approve="handleMappingApproval"
                        v-on:saveIEQ="saveIEQ" v-on:returnIEAC="ReturnIEAC" :CurDealerName="dealerSummaryInfo.companyName"
                        :ieacStatus = "dealerSummaryInfo.ieacStatus" :CurrentDealerStatus="dealerSummaryInfo.dealerStatus"
                        :isAllowEditQu="isAllowEditQu" :qualificationList="qualificationList">
              </ACIEView>
              <!-- <span v-else>
              v-if="(ieCompanyData != null &&  ieCompanyData.length && ieCompanyData.length > 0) || (acDealerData != null && acDealerData.length && acDealerData.length > 0)"
                该供应商尚未提交关联公司以及进出口公司
              </span> -->
            </el-tab-pane>

          </el-tabs>
        </el-col>
      </el-row>
      <el-row>
        <ApprovalView v-bind:ApprovalInfos="approvalInfo" v-bind:taskID="taskID" v-on:ApprovedSuccess="Reload">
        </ApprovalView>
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
  import DealerAuthCertMgr from './DealerAuthCertMgr';
  import ACDealerApprovalList from './ACDealerApprovalList';
  import DealerPermission from './DealerPermission';

  var array = require('array');

  export default {
    name: 'DealerDetail',
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
        isCurLegal: false,
        fileSvcUrl: defaultData.zeissFileBaseUrl,
        dialogVisible: false,

        relatedDialogVisible: false,
        IsHaveRelatedDealer: false,
        BeRelatedDealer: null,
        
        qualificationList: null,
        isAllowEditQu: false,

        dpDialogVisible: false,
        DPCheckResult: {
          IsCoordinatorOfCurDealer: false,
          IsSalesOfCurDealer: false,
          IsZMOfCurDealer: false,
          IsRSMOfCurDealer: false,
          IsLegalOfCurDealer: false,
          IsControllingOfCurDealer: false,
          IsMasterOfCurDealer: false,
          IsCoordinator: false
        },

        approvalInfo: {
          CurTasks: null,
          IsAllowCurrentUserApprove: true,
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
    components: {TopNav, DealerInfo, ACIEView, ApprovalView, FileManager, 
                DealerAuthCertMgr, ACDealerApprovalList, DealerPermission},
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
      //this.test();
      if(this.$route.params && this.$route.params.dealerId) {
        this.dealerId = this.$route.params.dealerId;
        this.activeName = "first";
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
      Reload: function() {
        this.$router.push({name: 'DealerDetail', params: {dealerId: this.dealerId}});
      },
      OpenDFPage: function() {
        var url = defaultData.dfBaseUrl + "DealerFileDetail/" + this.dealerId;
        window.open(url);
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
              this.DPCheckResult = responseData.dpcr;
              this.approvalInfo = responseData.ApprovalInfos;
              this.acDealerData = responseData.ACDealers;
              this.qualificationList = responseData.QualificationList;
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
              this.isCurLegal = responseData.IsCurLegal;
              //set legal file
              if(responseData.LegalFiles && responseData.LegalFiles.length > 0)
              {
                this.legalFileName = responseData.LegalFiles[0].FileName;
                this.legalFileID = responseData.LegalFiles[0].FileID;
              }
              this.IsHaveRelatedDealer = responseData.IsHaveRelatedDealer;
              this.BeRelatedDealer = responseData.BeRelatedDealer;
              // if(responseData.ApprovalInfos.currentAccount && responseData.ApprovalInfos.currentAccount != ""
              //   && responseData.SummaryInfo.coordinatorAccount &&  responseData.SummaryInfo.coordinatorAccount != ""
              //   && responseData.ApprovalInfos.currentAccount.toUpperCase() == responseData.SummaryInfo.coordinatorAccount.toUpperCase() ) {
              //     //current user is coordinator, then allowed edit IE qualificationList
              //     this.isAllowEditQu = true;
              //   } else {
              //     this.isAllowEditQu = false;
              //   }
              if(this.DPCheckResult && (this.DPCheckResult.IsCoordinatorOfCurDealer || this.DPCheckResult.IsMasterOfCurDealer))
              {
                this.isAllowEditQu = true;
              } else {
                this.isAllowEditQu = false;
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
        if(status == "ACTIVE") {
          var requestParam = {
              taskParams: {
                TaskID : this.dealerId ,
                TaskStatus : status,
                Comments : ""
              }
            };
            this.UpdateACDealerStatus(requestParam);
        } else if(status == "INACTIVE") {
          this.$confirm('Please input comments', 'Comments', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Close',
              showInput: true
            }).then(({ value }) => {
              var requestParam = {
                  taskParams: {
                    TaskID : this.dealerId,
                    TaskStatus : status,
                    Comments : value
                  }
                };
                this.UpdateACDealerStatus( requestParam);
            }).catch(() => {

            });
        }
      },
      UpdateACDealerStatus: function(requestParam) {
        var requestUrl = defaultData.cdServiceUrl +  "/ValidateACDealerInfo"; //"/" + this.dealerId + "/" + status;
        this.ShowLoadingView();
        this.axios.post(requestUrl, requestParam).then((response) => {
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
      saveIEQ: function(value) {
        var requestUrl = defaultData.cdServiceUrl +  "/SetIEQualification";
        var requestParam = {
          ieqParam: {
            DealerID: this.dealerId,
            IECompanyInfos: JSON.parse(JSON.stringify(value))
          }
        };
        this.ShowLoadingView();

        this.axios.post(requestUrl, requestParam).then((response) => {
          this.HideLoadingView();
          if(response.data && response.data.SetIEQualificationResult
            && response.data.SetIEQualificationResult.Status == "success")
          {
            this.$message("Action Success!");
          } else if(response.data && response.data.SetIEQualificationResult){
            this.$message.error(response.data.SetIEQualificationResult.Message);
          } else {
            this.$message.error(response.message);
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      ReturnIEAC: function() {
        var requestUrl = defaultData.cdServiceUrl +  "/ReturnIEAndRE/" + this.dealerId;
        this.ShowLoadingView();

        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.data && response.data.ReturnIEAndREResult) {
            if(response.data.ReturnIEAndREResult.Status == "success") {
              this.$message("Action Success!");
              this.dealerSummaryInfo.ieacStatus = 1;
            } else {
              this.$message.error(response.data.ReturnIEAndREResult.Message);
            }
          } else {
            this.$message.error("something error!");
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
              TaskID : mappingValue.MappingId,
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
      LoadBeRelatedDealerFromServer: function() {
        var requestUrl = defaultData.cdServiceUrl +  "/LoadBeRelatedDealer/" + this.dealerId;
        this.ShowLoadingView();

        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          //TODO
          if(response.status == "200" && response.data.LoadBeRelatedDealerResult.Status == "success")
          {
            this.BeRelatedDealer = response.data.LoadBeRelatedDealerResult.Data;
          } else if (response.status == "200") {
            this.$message.error(response.data.LoadBeRelatedDealerResult.Message);
          } else {
            this.$message.error(response.message);
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(errr.message);
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

            this.LoadBeRelatedDealerFromServer();
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
      NavigateToApplication: function() {
          this.$router.push({name: 'DealerApplicationPage', params: {dealerId: this.dealerId}});
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
      NavigateToNewApproval: function() {
        this.$router.push({path: "/_layouts/15/Zeiss.SpotDealer/NewApprovalForm.aspx?dealerid=" + this.dealerid});
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

<template>
  <el-row class="mainDiv">
    <el-col>
      <el-row class="topNav">
        <el-col>
          <TopNav v-on:activeIndex="navKey">
          </TopNav>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <DealerApplicationForm ref="daform" v-bind:initData="applidationInfo"
                                  v-bind:IsAllowCurrentUserSubmit="approvalInfo.IsAllowCurrentUserSubmit"
                                  v-on:Submit="SubmitApplication">
          </DealerApplicationForm>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <ApprovalView v-bind:ApprovalInfos="approvalInfo" v-bind:taskID="taskID"
                        v-on:approveTask="ApproveTask"
                        v-on:ApprovedSuccess="Reload">
          </ApprovalView>
        </el-col>
      </el-row>
  </el-col>
</el-row>
</template>

<script>
  import DealerApplicationForm from './DealerApplicationForm';
  import ApprovalView from './ApprovalView';
  import TopNav from './TopNav';
  import defaultData from '../defaultData';
  import { Loading } from 'element-ui';

  export default {
    name: 'DealerApplicationPage',
    data() {
      return {
        navKey: '1',
        dealerId: '',
        approvalInfo: {
            AppWFStatus: "1",
            CurTasks: null,
            IsAllowCurrentUserApprove: false,
            IsAllowCurrentUserSubmit: true,
            Messages: null
        },
        taskID: '',
        applidationInfo: null
      }
    },
    components: {DealerApplicationForm,ApprovalView,TopNav},
    watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      if(this.$route.params && this.$route.params.dealerId) {
        if(this.$route.params.taskId)
          {
            this.taskID = this.$route.params.taskId;
          }
          this.dealerId = this.$route.params.dealerId;
          this.LoadDetailFromServer();
        } else {
          this.$message.error("no dealer id!");
        }
      }
    },
    Created: function() {
      if(this.$route.params && this.$route.params.dealerId) {
        if(this.$route.params.taskId)
        {
          this.taskID = this.$route.params.taskId;
        }
        this.dealerId = this.$route.params.dealerId;
        this.LoadDetailFromServer();
      } else {
        this.$message.error("no dealer id!");
      }
    },
    methods: {
      ShowLoadingView: function() {
        Loading.service({ fullscreen: true });
      },
      HideLoadingView: function() {
        let curLoadingInstance = Loading.service({ fullscreen: true });
        curLoadingInstance.close();
      },
      ApproveTask: function(requestParam) {

      },
      Reload: function() {
        this.LoadDetailFromServer();
      },
      LoadDetailFromServer: function() {
        var requestUrl = defaultData.cdServiceUrl +  "/LoadDealerApplicationDetail/" + this.dealerId;
        this.ShowLoadingView();

        this.axios.post(requestUrl).then((response) => {
          if(response.data && response.data.LoadDealerApplicationDetailResult
            && response.data.LoadDealerApplicationDetailResult.Status == "success")
            {
              var responseData = response.data.LoadDealerApplicationDetailResult.Data;
              this.applidationInfo = responseData.ApplicationInfo;
              this.approvalInfo = {
                IsAllowCurrentUserApprove: responseData.ApprovalInfos.IsAllowCurrentUserApprove,
                SelfInfoWFStatus: responseData.ApprovalInfos.AppWFStatus,
                IsAllowCurrentUserStartSIWF: responseData.ApprovalInfos.IsAllowCurrentUserSubmit,
                CurTasks: responseData.ApprovalInfos.CurTasks,
                Messages: responseData.ApprovalInfos.Messages
              };

            } else if(response.data && response.data.LoadDealerApplicationDetailResult)
            {
                this.$message.error(response.data.LoadDealerApplicationDetailResult.Message);
            } else {
              this.$message.error(response.message);
            }
        }).catch((error) => {
          this.$message.error(error.message);
        });
      },
      SubmitApplication: function(requestParam) {
        var requestUrl = defaultData.cdServiceUrl +  "/SubmitDealerApplicationInfo";
        this.ShowLoadingView();

        this.axios.post(requestUrl,requestParam).then((response) => {

        }).catch((error) => {
          this.$message.error(error.message);
        });
      }
    }
  }
</script>

<style scoped="scoped">
</style>

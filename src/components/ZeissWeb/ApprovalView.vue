<template>
  <div style="padding-top:20px; padding-bottom:30px">
    <el-row class="sectionTitle">
      <el-col :span="24">
        <span style="padding-left: 5px;">审核流程</span>
      </el-col>
    </el-row>
    <el-row class="smallRow" style="padding-bottom:20px;" v-if="taskID != '' && messages && messages.length > 0">
      <el-col :span="3" :offset="1">
        审核历史
      </el-col>
      <el-col :span="18" :offset="1">
        <el-row v-for="item in messages">
          <el-col :span="24" style="text-align:left;">
            {{getMessageCreatedDate(item)}}&nbsp;&nbsp;{{item.Message}}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-row class="smallRow" v-if="ApprovalInfos.IsAllowCurrentUserApprove && taskID != ''">
          <el-col :span="4">
            Comments:
          </el-col>
          <el-col :span="20">
            <el-row>
              <el-col>
                <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="Please Input Comments"
                      v-model="approvalComments">
                </el-input>
              </el-col>
            </el-row>
            <el-row  class="smallRow">
              <el-col :span="8">
                <el-button type="primary" size="small" v-on:click="taskApproval('3')">Approved</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" size="small" v-on:click="taskApproval('4')">Rejected</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="padding-top:20px">
          <el-col>
            <!-- <el-steps :space="150" :active="activeStep">
              <el-step v-for="item in ApprovalInfos.CurTasks" v-bind:title="item.Approver" 
              v-bind:description="getDate(item)">
                <img class="ImgInfo" src="../../assets/process_status2.png" slot="icon" />
              </el-step>
            </el-steps> -->
            <el-steps align-center >
              <el-step v-for="item in tasks" v-bind:key="item.TaskId" v-bind:title="item.Approver"
                        v-bind:description="getDate(item)" v-bind:icon="getIcon(item)" v-bind:status="getStepStatus(item)">
                  <!-- <i :class="getIcon(item)" slot="icon"></i> -->
              </el-step>
            </el-steps>
          </el-col>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  var moment = require('moment');
  import defaultData from '../defaultData';
  var array = require('array');
  import { Loading } from 'element-ui';

  export default {
    name: '',
    data() {
      return {
        activeStep : 1,
        tasks: null,
        approvalComments:'',
        messages: null
      }
    },
    props: ['ApprovalInfos','taskID'],
    created: function() {
      this.setActiveStep();
    },
    components: {Loading},
    watch: {
      ApprovalInfos: function(newValue) {
        this.setActiveStep();
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
      setActiveStep: function() {
        var activeStep = 0;

        if(this.ApprovalInfos && this.ApprovalInfos.CurTasks && this.ApprovalInfos.CurTasks.length > 0) {
          var aStep = 0;
          var defaultCompleteStatus = "1";
          this.messages = this.ApprovalInfos.Messages;
          var tasks = this.ApprovalInfos.CurTasks;
          for(var key in tasks) {
            var task = tasks[key];
            if(task.TaskStatus == 3) {
              aStep = aStep + 1;
              defaultCompleteStatus = "3"
            } else {
              this.activeStep = aStep;
              defaultCompleteStatus = "1"
              break;
            }
          }
          tasks.push({
                    Approver: "Completed",
                    ApproverAccount: "",
                    Comments: null,
                    Created: null,
                    Modified: null,
                    TaskConfigId: -1,
                    TaskId: -1,
                    TaskStatus: defaultCompleteStatus,
                    WFId: -1,
                    dealer_id: "",
                    order: 99
          });
          if(defaultCompleteStatus == "1")
          {
            this.activeStep = aStep;
          } else {
            this.activeStep = aStep + 1;
          }
          this.tasks = tasks;
        } else {
          this.tasks = null;
          this.messages = null;
        }
      },
      getStatusImg: function(task) {
        switch (task.TaskStatus) {
          case "1":
            return "..//..//assets//process_status4.png";
          case "2":
            return "..//..//assets//process_status2.png";
          case "3":
            return "..//..//assets//process_status1.png";
          case "4":
            return "..//..//assets//process_status3.png";
          default:
            return "";
        }
      },
      getDate: function(value) {
        if(value.TaskStatus == "3" || value.TaskStatus == "4")
        {
          if(value.Modified) {
            if(moment(value.Modified).isValid()) {
              return moment(value.Modified).format(defaultData.dateFormat);
            }
          }
        } else if(value.TaskStatus == "2"){
          return "Pending"
        }
        return "";
      },
      getMessageCreatedDate: function(message) {
        return moment(message.Created).format(defaultData.dateFormat);
      },
      getStepStatus: function(value) {
        if(value.TaskStatus == "3")
        {
          return "finish";
        }
        else if(value.TaskStatus == "4")
        {
          return "finish";
        }
        else if(value.TaskStatus == "2")
        {
          return "process";
        }
        return "wait";
      },
      getIcon: function(task) {
        switch (task.TaskStatus) {
          case "1":
            return "el-icon-time";
          case "2":
            return "el-icon-question";
          case "3":
            return "el-icon-success";
          case "4":
            return "el-icon-error";
          default:
            return "el-icon-time";
        }
      },
      taskApproval: function(approvalStatus) {
        // var requestUrl = defaultData.cdServiceUrl + "/ApproveTask";
        // this.ShowLoadingView();
        var requestParam = {
            taskParams: {
            TaskID : this.taskID,
            TaskStatus : approvalStatus,
            Comments : this.approvalComments
          }
        };
        this.$emit('approveTask',requestParam)
        // this.axios.post(requestUrl,requestParam).then((response) => {
        //   this.HideLoadingView();
        //   if(response.status == '200' && response.data) {
        //       if(response.data.ApproveTaskResult && response.data.ApproveTaskResult.Status == "success") {
        //         this.$alert('操作成功！', 'Success', {
        //             confirmButtonText: '关闭',
        //             callback: action => {
        //                 this.$emit('ApprovedSuccess');
        //             }
        //           });
        //       } else {
        //         this.$message.error(response.data.ApproveTaskResult.Message);
        //       }
        //     } else {
        //     this.$message.error(response.status);
        //   }
        // }).catch((error) => {
        //   this.HideLoadingView();
        //   this.$message.error(error.message);
        // });

      }
    }
  }
</script>

<style scoped="scoped">
.ImgInfo {
  width: 48px;
}
.smallRow {
  padding: 10px 0px 10px 0px;
}
.sectionTitle {
  background-color: rgba(107, 145, 188);
  color: rgba(254, 254, 254);
  font-size: 20px;
  line-height: 30px;
  text-align: left;
}
</style>

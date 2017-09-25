<template>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-row class="topNav">
          <el-col>
            <TopNav v-bind:activeIndex="navKey">
            </TopNav>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-tabs v-model="activeIndex" type="card">
              <el-tab-pane label="Active" name="first">
                <ZeissTaskList v-bind:initData="activeTask"></ZeissTaskList>
              </el-tab-pane>
              <el-tab-pane label="Completed" name="second">
                <ZeissTaskList v-bind:initData="completedTask"></ZeissTaskList>
              </el-tab-pane>
              <el-tab-pane label="All" name="third">
                <ZeissTaskList v-bind:initData="allTask"></ZeissTaskList>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
</template>

<script>
  import TopNav from './TopNav';
  import defaultData from '../defaultData';
  import { Loading } from 'element-ui';
  import ZeissTaskList from './ZeissTaskList';
  var array = require('array');

  export default {
    name: "ZeissTask",
    data() {
      return {
        navKey: 'MyTask',
        allTask: null,
        activeTask: null,
        completedTask: null,
        activeIndex: 'first'
      }
    },
    components: {TopNav,ZeissTaskList},
    created: function() {
      this.LoadTaskFromServer();
    },
    methods: {
      ShowLoadingView: function() {
        Loading.service({ fullscreen: true });
      },
      HideLoadingView: function() {
        let curLoadingInstance = Loading.service({ fullscreen: true });
        curLoadingInstance.close();
      },
      LoadTaskFromServer: function() {
          var requestUrl = defaultData.cdServiceUrl + "/LoadMyTaskList";
          this.ShowLoadingView();

          this.axios.post(requestUrl).then((response) => {
            this.HideLoadingView();
            if(response.data && response.data.LoadMyTaskListResult) {
              if(response.data.LoadMyTaskListResult.Status == "success") {
                if(response.data.LoadMyTaskListResult.Data != null && response.data.LoadMyTaskListResult.Data.length > 0) {
                  var alltaskList = new array();
                  var activetaskList = new array();
                  var completedtaskList = new array();
                  for(var key in response.data.LoadMyTaskListResult.Data) {
                    var item = response.data.LoadMyTaskListResult.Data[key];
                    alltaskList.push(item);
                    if(item.TaskStatus == '2') {
                      activetaskList.push(item);
                    } else if(item.TaskStatus == '3' || item.TaskStatus == '4') {
                      completedtaskList.push(item);
                    }
                  }
                  this.allTask = alltaskList.toArray();
                  this.activeTask = activetaskList.toArray();
                  this.completedTask = completedtaskList.toArray();
                } else {
                  this.$message("No Task!");
                  this.allTask = null;
                  this.activeTask = null;
                  this.completedTask = null;
                }
              } else {
                this.$message.error(response.data.LoadMyTaskListResult.Message);
              }
            } else {
              this.$message.error("return data doesn't follow format!");
            }
          }).catch((error) => {
            this.HideLoadingView();
            this.$message.error(error.message);
          });
      }
    }
  }
</script>

<style scoped="scoped">
</style>

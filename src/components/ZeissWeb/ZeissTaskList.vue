<template>
  <div>
    <el-row style="padding-top:5px;padding-bottom:10px;">
      <el-col :span="4" :offset="2">
        <el-input v-model="filterKey" placeholder="search" icon="search" size="small"
              :on-icon-click="FilterBoundData">
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="resultData" border stripe style="width:100%;">
          <el-table-column label="Company Name" prop="DealerName">
            <template scope="scope">
              <a v-on:click="GotoDealerDetail(scope.row)">{{scope.row.DealerName}}</a>
            </template>
          </el-table-column>
          <el-table-column label="Task Type" prop="TaskType">
              <template scope="scope">
                {{scope.row.TaskType == "DealerInfoTask" ? "自我声明表": "经销商申请表"}}
              </template>
          </el-table-column>
          <el-table-column label="Approver" prop="Approver">
          </el-table-column>
          <el-table-column label="Status" prop="TaskStatus">
            <template scope="scope">
              {{GetStatus(scope.row)}}
            </template>
          </el-table-column>
          <el-table-column label="Created" prop="Created">
            <template scope="scope">
              {{GetDate(scope.row.Created)}}
            </template>
          </el-table-column>
          <el-table-column label="Modified" prop="Modified">
            <template scope="scope">
              {{GetDate(scope.row.Modified)}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  var moment = require('moment');
  var array = require('array');
  import defaultData from '../defaultData';

  export default {
    name: 'ZeissTaskList',
    data() {
      return {
        filterKey: '',
        resultData: null
      }
    },
    props: ['initData'],
    created: function() {
      this.resultData = this.initData;
    },
    watch: {
      initData: function(newData) {
        this.resultData = this.initData;
      }
    },
    methods: {
      FilterBoundData: function(ev) {
        if(this.filterKey == null || this.filterKey == "") {
          this.resultData = this.initData;
          return;
        }
        if(this.initData != null && this.initData.length > 0) {
          var filterResult = new array();
          for (var key in this.initData) {
            var item = this.initData[key];
            if((item.DealerName && item.DealerName.indexOf(this.filterKey) != -1) ||
            (item.Approver && item.Approver.indexOf(this.filterKey) != -1)) {
              filterResult.push(item);
            }
          }
          this.resultData = filterResult.toArray();
        }
      },
      GetStatus: function(value) {
        switch (value.TaskStatus) {
          case "1":
            return "Not Started";
          case "2":
            return "Pendding On";
          case "3":
            return "Approved"
          case "4":
            return "Rejected"
          default:
            return "";
        }
      },
      GetDate: function(value) {
        return new moment(value).format(defaultData.dateFormat);
      },
      GotoDealerDetail: function(task) {
        if(task.TaskType == "DealerInfoTask")
        {
          this.$router.push({name: 'TaskDetail', params: {dealerId: task.DealerID, taskId: task.TaskID}});
        } else {
          this.$router.push({name: 'DealerApplicationTask', params: {dealerId: task.DealerID, taskId: task.TaskID}});
        }
      }
    }
  }
</script>

<style scoped="scoped">
</style>

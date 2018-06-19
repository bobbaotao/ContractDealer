<template>
  <div>
    <el-row style="padding-top:5px;padding-bottom:10px;">
      <el-col :span="5" :offset="1">
        <el-input v-model="filterKey" placeholder="search" size="small">
            <i class="el-icon-search" slot="append" @click="FilterBoundData">
            </i>
        </el-input>
      </el-col>
    </el-row>
        <el-table :data="resultData" border stripe style="width:100%;">
          <el-table-column label="Company Name" prop="DealerName" sortable>
            <template scope="scope">
              <span class="taskTitle">
                <a v-on:click="GotoDealerDetail(scope.row)">{{scope.row.DealerName}}</a>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="Task Type" prop="TaskType" sortable  width="200">
              <template scope="scope">
                {{scope.row.TaskType == "DealerInfoTask" ? "自我声明表": (scope.row.TaskType == "DealerAppTask" ? "经销商申请表" : "经销商评估表")}}
              </template>
          </el-table-column>
          <el-table-column label="Approver" prop="Approver" sortable  width="180">
          </el-table-column>
          <el-table-column label="Status" prop="TaskStatus" sortable  width="180">
            <template scope="scope">
              {{GetStatus(scope.row)}}
            </template>
          </el-table-column>
          <el-table-column label="Created" prop="Created" sortable  width="180">
            <template scope="scope">
              {{GetDate(scope.row.Created)}}
            </template>
          </el-table-column>
          <el-table-column label="Modified" prop="Modified" sortable width="180">>
            <template scope="scope">
              {{GetDate(scope.row.Modified)}}
            </template>
          </el-table-column>
        </el-table>
      
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
            if((item.DealerName && item.DealerName.toUpperCase().indexOf(this.filterKey.toUpperCase()) != -1) ||
            (item.Approver && item.Approver.toUpperCase().indexOf(this.filterKey.toUpperCase()) != -1)) {
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
            return "Pending";
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
        } else if(task.TaskType == "DealerAppTask") {
          this.$router.push({name: 'DealerApplicationTask', params: {dealerId: task.DealerID, taskId: task.TaskID}});
        } else {
          var url = defaultData.dfBaseUrl + "AssessmentTaskPage/" + task.DealerID + "/" + task.AssessmentID + "/" + task.TaskID;
          window.open(url);
        }
      }
    }
  }
</script>

<style scoped="scoped">
.taskTitle{
  text-align: left;
  margin-left: 12px;
}
</style>

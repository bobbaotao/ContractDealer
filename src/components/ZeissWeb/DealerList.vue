<template>
  <div>
    <el-row style="padding-top:5px;padding-bottom:10px;">
      <el-col :span="4" :offset="2">
        <el-input v-model="filterKey" placeholder="search" icon="search" size="small"
              :on-icon-click="FilterBoundData">
        </el-input>
      </el-col>
    </el-row>
      <el-table :data="resultData" border stripe style="width:100%;">
      <el-table-column label="Company Name" prop="companyName"  min-width="110">
        <template scope="scope">
          <a v-on:click="GotoDealerDetail(scope.row.dealerID)">{{scope.row.companyName}}</a>
        </template>
      </el-table-column>
      <el-table-column label="Dealer Status" prop="dealerStatus" min-width="110">
        <template scope="scope">
          {{GetStatus(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column label="IEAC Status" prop="ieacStatus"  min-width="110">
        <template scope="scope">
          {{GetMappingStatus(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column label="Division" prop="division"  min-width="110">
        <template scope="scope">
          {{scope.row.division}}
        </template>
      </el-table-column>
      <el-table-column label="Sales Region" prop="salesRegion"  min-width="110">
        <template scope="scope">
          {{scope.row.salesRegion}}
        </template>
      </el-table-column>
      <el-table-column label="Sales" prop="sales"  min-width="110">
        <template scope="scope">
            {{scope.row.sales}}
        </template>
      </el-table-column>
      <el-table-column label="Coordinator" prop="coordinator"  min-width="110">
        <template scope="scope">
            {{scope.row.coordinator}}
        </template>
      </el-table-column>
      <el-table-column label="Created"  min-width="110">
        <template scope="scope">
            {{GetDate(scope.row.created)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  var array = require('array');
  var moment = require('moment');
  import defaultData from '../defaultData';

  export default {
    name: "",
    data () {
      return {
        filterKey: "",
        resultData:[]
      }
    },
    props: ['initData'],
    watch: {
      initData: function(newData) {
        this.resultData = this.initData;
      }
    },
    methods: {
      GotoDealerDetail: function(dealerId) {
        this.$router.push({name: 'DealerDetail', params: {dealerId: dealerId}});
      },
      GetStatus: function(value) {
        switch (value.dealerStatus) {
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
        switch (value.ieacStatus) {
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
      },
      FilterBoundData: function(ev) {
        if(this.filterKey == null || this.filterKey == "") {
          this.resultData = this.initData;
          return;
        }
        if(this.initData != null && this.initData.length > 0) {
          var filterResult = new array();
          for (var key in this.initData) {
            var item = this.initData[key];
            if((item.companyName && item.companyName.indexOf(this.filterKey) != -1) ||
            (item.coordinator && item.coordinator.indexOf(this.filterKey) != -1) ||
            (item.sales && item.sales.indexOf(this.filterKey) != -1) ||
            (item.division && item.division.indexOf(this.filterKey) != -1) ||
            (item.salesRegion && item.salesRegion.indexOf(this.filterKey) != -1)) {
              filterResult.push(item);
            }
          }
          this.resultData = filterResult.toArray();
        }
      }
      ,
      GetDate: function(value) {
        return new moment(value).format(defaultData.dateFormat);
      }
    }
  }
</script>

<style scoped>
</style>

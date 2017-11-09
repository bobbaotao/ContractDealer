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
      <el-table-column label="Company Name" prop="companyName" sortable  min-width="110">
        <template scope="scope">
          <a v-on:click="GotoDealerDetail(scope.row.dealerID)">{{scope.row.companyName}}</a>
        </template>
      </el-table-column>
      <el-table-column label="Dealer Status" prop="dealerStatus" sortable min-width="110">
        <template scope="scope">
          {{GetStatus(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column label="IEAC Status" prop="ieacStatus" sortable v-if="dealerType == '9'" min-width="110">
        <!-- no used -->
        <template scope="scope">
          {{GetMappingStatus(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column label="Related Status" prop="waitApprovedACDealer" sortable v-if="dealerType == '2'" min-width="110">
        <template scope="scope">
          <el-tooltip placement="left">
            <div slot="content">
              {{scope.row.TotalACDealer}} Total related dealer<br />
              {{scope.row.ApprovedACDealer}} relationship got approved<br />
              {{scope.row.waitApprovedACDealer}} relationship waiting for approval<br />
              {{scope.row.dealerInfoNotApprovedACDealer}} dealer info waiting for approval<br />
              {{scope.row.notSubmittedACDealer}} dealer info not submit
            </div>
            <div>
              {{scope.row.TotalACDealer}} | {{scope.row.ApprovedACDealer}} | {{scope.row.waitApprovedACDealer}} | {{scope.row.dealerInfoNotApprovedACDealer}} | {{scope.row.notSubmittedACDealer}}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Be Related Status" prop="beMappedDealerNum" sortable
      v-if="dealerType != '2'" min-width="130">
        <template scope="scope">
          <el-tooltip placement="left">
            <div slot="content">
              {{scope.row.beMappedDealerNum}} Total related dealer<br />
              {{scope.row.approvedMapDealerNum}} relationship got approved<br />
              {{scope.row.waitApprovalMapDealerNum}} relationship waiting for approval
            </div>
            <div>
              {{scope.row.beMappedDealerNum}} | {{scope.row.approvedMapDealerNum}} | {{scope.row.waitApprovalMapDealerNum}}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Division" prop="division" sortable min-width="110">
        <template scope="scope">
          {{scope.row.division}}
        </template>
      </el-table-column>
      <el-table-column label="Sales Region" prop="salesRegion" sortable  min-width="110">
        <template scope="scope">
          {{scope.row.salesRegion}}
        </template>
      </el-table-column>
      <el-table-column label="Sales" prop="sales" sortable  min-width="110">
        <template scope="scope">
            {{scope.row.sales}}
        </template>
      </el-table-column>
      <el-table-column label="Coordinator" prop="coordinator" sortable  min-width="110">
        <template scope="scope">
            {{scope.row.coordinator}}
        </template>
      </el-table-column>
      <el-table-column label="Created" prop="created" sortable  min-width="90">
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
    props: ['initData', 'dealerType'],
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
            if((item.companyName && item.companyName.toUpperCase().indexOf(this.filterKey.toUpperCase()) != -1) ||
            (item.coordinator && item.coordinator.toUpperCase().indexOf(this.filterKey.toUpperCase()) != -1) ||
            (item.sales && item.sales.toUpperCase().indexOf(this.filterKey.toUpperCase()) != -1) ||
            (item.division && item.division.toUpperCase().indexOf(this.filterKey.toUpperCase()) != -1) ||
            (item.salesRegion && item.salesRegion.toUpperCase().indexOf(this.filterKey.toUpperCase()) != -1)) {
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

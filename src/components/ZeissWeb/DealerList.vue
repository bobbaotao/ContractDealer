<template>
  <div>
    <el-row style="padding-top:5px;padding-bottom:10px;">
      <el-col :span="4" :offset="2">
        <el-input v-model="filterKey" placeholder="search" icon="search" size="small"
              :on-icon-click="FilterBoundData">
        </el-input>
      </el-col>
      <el-col :span="6" :offset="12">
        <el-button icon="download" v-on:click="downloadMappingFromServer">Download Dealer AC Mapping detail</el-button>
      </el-col>
    </el-row>
      <el-table :data="resultData" border stripe style="width:100%;">
        <el-table-column label="Company Name" prop="companyName" sortable  min-width="150">
          <template scope="scope">
            <a v-on:click="GotoDealerDetail(scope.row.dealerID)">{{scope.row.companyName}}</a>
          </template>
        </el-table-column>
        <el-table-column label="Dealer Status" prop="dealerStatus" sortable min-width="100">
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
        <el-table-column label="是否存在待审关系" prop="isNeedACApproval" sortable v-if="dealerType == '2'" min-width="110">
          <template scope="scope">
            <!-- <el-tooltip placement="left">
              <div slot="content">
                {{scope.row.TotalACDealer}} Total related dealer<br />
                {{scope.row.waitApprovedACDealer}} relationship waiting for approval<br />
                {{scope.row.ApprovedACDealer}} relationship got approved<br />
                {{scope.row.RejectedACDealer}} relationship got rejected<br />
                {{scope.row.dealerInfoWaitApprovedACDealer}} dealer info waiting for approval<br />
                {{scope.row.dealerInfoApprovedACDealer}} dealer info already approved<br />
                {{scope.row.notSubmittedACDealer}} dealer info not submit
              </div>
              <div>
                {{GetRelatedDealerStatusMsg(scope.row)}}
              </div>
            </el-tooltip> -->
              <div>
                {{GetRelatedDealerStatusMsg(scope.row)}}
              </div>
          </template>
        </el-table-column>
        <el-table-column label="是否存在待审关系" prop="isNeedACApproval" sortable
        v-if="dealerType != '2'" min-width="110">
          <template scope="scope">
             <div>
                {{GetBeRelatedDealerStatusMsg(scope.row)}}
              </div>
            <!-- <el-tooltip placement="left">
              <div slot="content">
                {{scope.row.beMappedDealerNum}} Total related dealer<br />
                {{scope.row.approvedMapDealerNum}} relationship got approved<br />
                {{scope.row.rejectedMapDealerNum}} relationship got rejected<br />
                {{scope.row.waitApprovalMapDealerNum}} relationship waiting for approval
              </div>
              <div>
                {{GetBeRelatedDealerStatusMsg(scope.row)}}
              </div>
            </el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column label="Division" prop="division" sortable min-width="90">
          <template scope="scope">
            {{scope.row.division}}
          </template>
        </el-table-column>
        <el-table-column label="Sales Region" prop="salesRegion" sortable  min-width="110">
          <template scope="scope">
            {{scope.row.salesRegion}}
          </template>
        </el-table-column>
        <el-table-column label="Sales" prop="sales" sortable  min-width="100">
          <template scope="scope">
              {{scope.row.sales}}
          </template>
        </el-table-column>
        <el-table-column label="Coordinator" prop="coordinator" sortable  min-width="100">
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
  import { Loading } from 'element-ui';
  import FileSaver from "file-saver";
  import { csvParse, csvParseRows, tsvParse, tsvParseRows, csvFormat, csvFormatRows, 
    tsvFormat, tsvFormatRows } from "d3-dsv";

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
      ShowLoadingView: function() {
        Loading.service({ fullscreen: true });
      },
      HideLoadingView: function() {
        let curLoadingInstance = Loading.service({ fullscreen: true });
        curLoadingInstance.close();
      },
      GotoDealerDetail: function(dealerId) {
        this.$router.push({name: 'DealerDetail', params: {dealerId: dealerId}});
      },
      GetStatus: function(value) {
        return this.GetStatusByValue(value.dealerStatus);
      },
      GetStatusByValue: function(value) {
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
        return this.GetMappingStatusByValue(value.ieacStatus);
      },
      GetMappingStatusByValue: function(value) {
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
      },
      GetRelatedDealerStatusMsg: function(value) {
        //TODO
        // if(value.TotalACDealer == 0){
        //     return "无关系公司";
        // }
        if(value.isNeedACApproval > 0)
        {
            //var totalPendingDealer =  value.waitApprovedACDealer + value.waitApprovedACDealer;
            return "有待审关系";
        }
        return "无待审关系";
        /* if(value.waitApprovedACDealer > 0 && value.dealerInfoWaitApprovedACDealer == 0
            && value.notSubmittedACDealer == 0) {
            return value.waitApprovedACDealer + "关系待审";
        }
        if(value.waitApprovedACDealer == 0 && value.dealerInfoWaitApprovedACDealer > 0
            && value.notSubmittedACDealer == 0) {
            return value.dealerInfoWaitApprovedACDealer + "信息待审";
        }
        if(value.waitApprovedACDealer == 0 && value.dealerInfoWaitApprovedACDealer == 0
            && value.notSubmittedACDealer > 0) {
            return value.notSubmittedACDealer + "信息未提交";
        }
        if(value.waitApprovedACDealer == 0 && value.dealerInfoWaitApprovedACDealer == 0
            && value.notSubmittedACDealer == 0) {
            var msg = "";
            if(value.ApprovedACDealer > 0) {
              msg = value.ApprovedACDealer + "通过";
            }
            if(value.RejectedACDealer > 0) {
              if(value.ApprovedACDealer > 0) {
                msg = msg + " | ";
              }
              msg = msg + value.RejectedACDealer + "拒绝";
            }
            return msg;
        }
        return value.waitApprovedACDealer + " | " + value.dealerInfoWaitApprovedACDealer + " | " + value.notSubmittedACDealer;
       */
      },
      GetBeRelatedDealerStatusMsg: function(value) {
          if(value.isNeedACApproval > 0) {
            return "有待审关系";
          }
          var msg = "无待审关系";
          /* if(value.approvedMapDealerNum > 0) {
            msg = value.approvedMapDealerNum + "通过";
          }
          if(value.rejectedMapDealerNum > 0) {
            if(value.approvedMapDealerNum > 0) {
              msg = msg + " | ";
            }
            msg = msg + value.rejectedMapDealerNum + "拒绝";
          } */
          return msg;
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
      },
      downloadMappingFromServer: function() {
        var requestUrl = defaultData.cdServiceUrl + "/LoadDealerMapList";
        this.ShowLoadingView();

        this.axios.post(requestUrl).then((rep) => {
          this.HideLoadingView();

          if(rep.data && rep.data.LoadDealerMapListResult 
            && rep.data.LoadDealerMapListResult.Status == "success") {
              this.exportToReport(rep.data.LoadDealerMapListResult.Data);
          } else if(rep.data && rep.data.LoadDealerMapListResult) {
            this.$message.error(rep.data.LoadDealerMapListResult.Message);
          } else {
            this.$message.error("Load Detail Failed!");
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error("Load Detail Failed!");
        });
      },
      exportToReport: function(data) {
        if(data) {
          //first try format datas
          data.forEach((item, index) => {
            item.ACCompanyStatus = item.IsACDealer == 0 ? (this.GetStatusByValue(item.ACCompanyStatus ? item.ACCompanyStatus.toString() : "")) : "";
            item.dealerInfo_status = item.IsACDealer == 0 ? (this.GetStatusByValue(item.dealerInfo_status ? item.dealerInfo_status.toString(): "")) : "";
            item.dealer_mapping_status = item.IsACDealer == 0 ? (this.GetMappingStatusByValue(item.dealer_mapping_status? item.dealer_mapping_status.toString() : "")) : "";
            item.dealer_status = item.IsACDealer == 0 ? (this.GetStatusByValue(item.dealer_status? item.dealer_status.toString() : 0)) : "";
            item.IsACDealer = item.IsACDealer == 0 ? "Affiliated Company" : "IE Compnay";
          });

          var exportedData = [["主公司","Division","Sales Region","IECompnay Or Affiliated Company","主公司信息表状态", "主公司关联关系是否提交",
            "被关联公司", "被关联公司信息表状态", " 关联关系状态"]].concat(data.map((item, index) => {
              return [
                item.company_name, item.division, item.sales_Region, item.IsACDealer, item.dealerInfo_status, item.dealer_status,
                item.ACCompanyName, item.ACCompanyStatus, item.dealer_mapping_status
              ];
            }));

          var csvContent = csvFormatRows(exportedData);

          var mime_type = "text/csv;charset=utf-8";
          var filename = "Dealer Mapping Detail List.csv";

          var file = new Blob([csvContent], {type: mime_type});

          FileSaver.saveAs(file, filename);

        } else {
          this.$message.error("Empty Data!");
        }
      }
    }
  }
</script>

<style scoped>
</style>

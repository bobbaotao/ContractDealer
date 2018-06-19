<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <el-table :data="acDealerData" border stripe style="width:100%;">
        <el-table-column label="公司名称" min-width="220">
          <template scope="scope">
            <a v-on:click="handleDealerClick(scope.row)">{{ scope.row.DealNamec }}</a>
          </template>
        </el-table-column>
        <el-table-column label="经销商状态" width="140">
          <template scope="scope">
              <span >{{ GetStatus(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关系状态" width="140">
          <template scope="scope">
              <span >{{ GetMappingStatus(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关系说明文件" min-width="200">
          <template scope="scope">
            <div v-for="docInfo of scope.row.MappingDocs">
              <a :href="GetFileUrl(docInfo)">{{docInfo.FileName}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="110" v-if="allowApproval">
          <template scope="scope">
            <el-button size="mini" type="primary" :disabled="scope.row.MappingStatus != 1" 
            v-on:click="handleMappingApproval(scope.row, 'Approve')">
              Approve
            </el-button>
            <el-button size="mini" type="primary" :disabled="scope.row.MappingStatus != 1"  
            v-on:click="handleMappingApproval(scope.row, 'Reject')">
              Reject
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import defaultData from '../defaultData';
  import { Loading } from 'element-ui';
  export default {
    name: "ACDealerApprovalList",
    data() {
      return {
      }
    },
    props: ['acDealerData','allowApproval','listType','relatedDealerStatus', 'relatedDealerName'], //listType: RelatedList, BeRelatedList
    components: { Loading },
    methods: {
      ShowLoadingView: function() {
        Loading.service({ fullscreen: true });
      },
      HideLoadingView: function() {
        let curLoadingInstance = Loading.service({ fullscreen: true });
        curLoadingInstance.close();
      },
      GetFileUrl: function(fileInfo) {
        return defaultData.zeissFileBaseUrl + '?method=load&fileid=' + fileInfo.FileID;
      },
      GetMappingStatus: function(value) {
        switch (value.MappingStatus) {
          case "0":
            return "未提交审核";
          case "1":
            return "审核中";
          case "2":
            return "审核通过";
          case "3":
            return "审核不通过";
          default:
            return "未提交审核";
        }
      },
      GetStatus: function(value) {
        switch (value.Status) {
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
      handleMappingApproval: function(value, status) {
        if(status == "Reject")    //if reject, then go to main logic
        {
            this.$emit('acdealerapproval', value, status);
            return;
        }
        // if approve, then need check status first
        if(this.listType == "BeRelatedList") {
          if(this.relatedDealerStatus != "3" && this.relatedDealerStatus != "2")
          {
            this.$alert(this.relatedDealerName + " need submit first!", "Message", {
              confirmButtonText: 'Confirm',
              callback: action => {
              }
            });
          } else if(value.Status != "3" && value.Status != "2") {
            this.$alert(value.DealNamec + " need submit and validated by Coordinator first!", "Message", {
              confirmButtonText: 'Confirm',
              callback: action => {
              }
            });
          }
           else {
            this.$emit('acdealerapproval', value, status);
          }
        } else {
          if(value.Status != "3" && value.Status != "2")
          {
            this.$alert(value.DealNamec + " need submit first!", "Message", {
              confirmButtonText: 'Confirm',
              callback: action => {
              }
            });
          } else if(this.relatedDealerStatus != "3" && this.relatedDealerStatus != "2") {
              this.$alert(this.relatedDealerName + " need submit and validated by Coordinator first!", "Message", {
              confirmButtonText: 'Confirm',
              callback: action => {
              }
            });
          } else {
            this.$emit('acdealerapproval', value, status);
          }
        }
      },
      handleDealerClick: function(value) {
        if(value) {
          if(value.Status == "0" || value.Status == "1")
          {
            this.$message("该供应商尚未提交信息表");
          } else {
            this.$router.push({name: 'DealerDetail', params: {dealerId: value.DealerId}});
          }
        }
      }
    }
  }
</script>

<style scoped="scoped">
.smallFont {
  font-size: 11px;
}
</style>

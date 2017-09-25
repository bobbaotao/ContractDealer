<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <el-table :data="acDealerData" border stripe style="width:100%;">
        <el-table-column label="公司名称" min-width="120">
          <template scope="scope">
            <a v-on:click="handleDealerClick(scope.row)">{{ scope.row.DealNamec }}</a>
          </template>
        </el-table-column>
        <el-table-column label="经销商状态" min-width="80">
          <template scope="scope">
              <span class="smallFont">{{ GetStatus(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联状态" min-width="80">
          <template scope="scope">
              <span class="smallFont">{{ GetMappingStatus(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联说明文件" min-width="170">
          <template scope="scope">
            <div v-for="docInfo of scope.row.MappingDocs">
              <a :href="GetFileUrl(docInfo)">{{docInfo.FileName}}</a>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="90">
          <template scope="scope">
            //todo
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import defaultData from '../defaultData';
  export default {
    name: "ACDealerApprovalList",
    data() {
      return {

      }
    },
    props: ['acDealerData'],
    methods: {
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

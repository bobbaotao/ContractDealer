<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <el-table :data="CompanyDatas" border stripe style="width:100%;">
        <el-table-column label="公司名称" min-width="120">
          <template scope="scope">
            <span class="smallFont">{{ scope.row.DealNamec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="营业执照注册号"  min-width="110">
          <template scope="scope">
            <span class="smallFont">{{ scope.row.CompanyCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人邮箱" min-width="110">
          <template scope="scope">
              <span class="smallFont">{{ scope.row.Email }}</span>
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
            <DMFilerMgr v-bind:dealerInfo="scope.row" v-bind:AllowEdit="AllowEdit"
                        v-on:ShowLoadingView="ShowLoadingView" v-on:HideLoadingView="HideLoadingView">
            </DMFilerMgr>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="90">
          <template scope="scope">
            <el-button size="mini" type="primary" icon="delete" :disabled="!AllowEdit"
                        v-on:click="DeleteACDealerMapping(scope.row)">
              删除关联
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import defaultData from '../defaultData'
  import DMFilerMgr from './DealerMappingFileMgr'

  export default {
    name: "ACCompanyList",
    props: ['CompanyDatas', 'AllowEdit'],
    data() {
      return {

      }
    },
    components: {DMFilerMgr},
    methods: {
      ShowLoadingView: function() {
        this.$emit("ShowLoadingView");
      },
      HideLoadingView: function() {
        this.$emit("HideLoadingView");
      },
      DeleteACDealerMapping(row) {
        var requestUrl = defaultData.serviceUrl + "?method=UpdateACDealerMapping&type=delete";
        this.$emit("ShowLoadingView");
        this.axios.post(requestUrl, row).then((response) => {
          this.$emit("HideLoadingView");
          if(response.status == "200" && response.data.Status == "success") {
            this.$emit("reLoadACDealers");
          } else if(response.status == "200") {
              this.$message.error(response.data.Message);
          } else {
            this.$message.error(response.message);
          }
        }).catch((error) => {
          this.$emit("HideLoadingView");
          this.$message.error(error.message);
        });
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
      }
    }
  }
</script>

<style scoped>
.smallFont {
  font-size: 11px;
}
</style>

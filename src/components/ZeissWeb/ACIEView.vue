<template>
  <div>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
            <span style="padding-left: 5px;">Affiliated Company Info</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col :span="24">
            <ACDealerApprovalList :allowApproval="isAllowCurrentUserApprove"
                                  :acDealerData="acDealerData" 
                                  v-on:acdealerapproval="handleMappingApproval">
            </ACDealerApprovalList>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
            <span style="padding-left: 5px;">IE Company Info</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col :span="24">
            <IECompanyList :ieCompanyData="ieCompanyData">
            </IECompanyList>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import IECompanyList from './IECompanyList';
  import ACDealerApprovalList from './ACDealerApprovalList';

  export default {
    name: "ACIEView",
    data() {
      return {
        isAllowCurrentUserApprove: this.allowApproval
      }
    },
    props: ['ieCompanyData','acDealerData','allowApproval'],
    components: {IECompanyList,ACDealerApprovalList},
    watch: {
      allowApproval: function(newvalue) {
        this.isAllowCurrentUserApprove = newvalue;
      }
    },
    methods: {
      handleMappingApproval: function(value, status) {
        this.$emit('approve', value, status);
      }
    }
  }
</script>

<style scoped="scoped">
.infoSection {
  border: 1px solid gray;
  text-align: left;
}
.sectionTitle {
  background-color: rgba(107, 145, 188);
  color: rgba(254, 254, 254);
  font-size: 20px;
  line-height: 30px;
  text-align: left;
}
.sectionDetail
{
  font-size: 12px;
  line-height: 18px;
  padding: 3px;
  background: rgba(254, 254, 254);
  color: black;
  text-align: left;
}
</style>

<template>
  <div>
    <el-row class="smallRow">
      <el-col :span="24" style="text-align:left">
        <el-button v-if="isAllowEditQu" :disabled="!ieacStatus || ieacStatus == '1'"
                    type="primary" size="small" v-on:click="ReturnIEAC">
          退回到经销商重填
        </el-button>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
            <span style="padding-left: 5px;">Related Company Info</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col :span="24">
            <ACDealerApprovalList :allowApproval="isAllowCurrentUserApprove" 
                    :relatedDealerStatus="CurrentDealerStatus" :relatedDealerName="CurDealerName"
                    :acDealerData="acDealerData" :listType="'RelatedList'"
                    v-on:acdealerapproval="handleMappingApproval">
            </ACDealerApprovalList>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle" type="flex" justify="space-between">
          <el-col :span="12">
            <span style="padding-left: 5px;">IE Company Info</span>
          </el-col>
          <el-col :span="4">
            <el-button size="small" v-if="isAllowEditQu && !isInEdit" v-on:click="isInEdit = true">
              修改经营范围
            </el-button>
            <el-button size="small" v-if="isAllowEditQu && isInEdit" v-on:click="saveIEQ">
              保存修改
            </el-button>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col :span="24">
            <IECompanyList ref="iecl" :ieCompanyData="ieCompanyData" :isInEdit="isInEdit"
                            :qualificationList="qualificationList">
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
        isAllowCurrentUserApprove: this.allowApproval,
        isInEdit: false
      }
    },
    props: ['ieCompanyData','acDealerData','allowApproval', 'isAllowEditQu', 'qualificationList', 'ieacStatus', 'CurrentDealerStatus', 'CurDealerName'],
    components: {IECompanyList,ACDealerApprovalList},
    watch: {
      allowApproval: function(newvalue) {
        this.isAllowCurrentUserApprove = newvalue;
      }
    },
    methods: {
      handleMappingApproval: function(value, status) {
        this.$emit('approve', value, status);
      },
      saveIEQ: function() {
        //TODO
        this.isInEdit = false;
        var ieData = this.$refs.iecl.loadSavedData();

        this.$emit('saveIEQ', ieData);
      },
      ReturnIEAC: function() {
        this.$emit('returnIEAC');
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
.smallRow
{
  padding-bottom: 5px;
}
</style>

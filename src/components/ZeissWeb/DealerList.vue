<template>
  <el-table :data="initData" border stripe style="width:100%;">
    <el-table-column label="Company Name" prop="companyName"  min-width="110">
      <template scope="scope">
        <a v-on:click="GotoDealerDetail(scope.row.dealerID)">{{scope.row.companyName}}</a>
      </template>
    </el-table-column>
    <el-table-column label="Dealer Status" prop="dealerStatus" min-width="110">
      <template scope="scope">
        {{scope.row.dealerStatus}}
      </template>
    </el-table-column>
    <el-table-column label="IEAC Status" prop="ieacStatus"  min-width="110">
      <template scope="scope">
        {{scope.row.ieacStatus}}
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
          <!-- {{scope.row.created}} --> to do
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "",
    data () {
      return {

      }
    },
    props: ['initData'],
    methods: {
      GotoDealerDetail: function(dealerId) {
        this.$router.push({name: 'DealerDetail', params: {dealerId: dealerId}});
      }
    }
  }
</script>

<style scoped>
</style>

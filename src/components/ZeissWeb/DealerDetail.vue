<template>
  <div class="mainDiv">
    <el-row class="topNav">
      <el-col>
        <TopNav v-on:activeIndex="navKey">
        </TopNav>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="Dealer Info" name="first">
          </el-tab-pane>
          <el-tab-pane label="IE Company & Affiliated Company" name="second">
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TopNav from './TopNav';
  export default {
    name: 'DealerDetail',
    data () {
      return {
        navKey: '1',
        dealerId: '',
        activeName: 'first'
      }
    },
    components: {TopNav},
    created: function() {
      if(this.$route.params && this.$route.params.dealerId) {
        this.dealerId = this.$route.params.dealerId;
      } else {
        this.$message.error("no dealer id!");
      }
    },
    methods:{

    }
  }
</script>

<style scoped="scoped">
</style>

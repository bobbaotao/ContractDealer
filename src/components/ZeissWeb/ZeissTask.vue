<template>
  <div>
    <el-row class="topNav">
      <TopNav v-on:activeIndex="navKey">
      </TopNav>
    </el-row>
    Task list. //TODO

  </div>
</template>

<script>
  import TopNav from './TopNav';
  import defaultData from '../defaultData';
  import { Loading } from 'element-ui';

  export default {
    name: "ZeissTask",
    data() {
      return {
        navKey: '2'
      }
    },
    components: {TopNav},
    methods: {

    }
  }
</script>

<style scoped="scoped">
</style>

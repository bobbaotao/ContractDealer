<template>
  <el-menu v-bind:default-active="activeIndex" class="el-menu-demo" mode="horizontal" v-bind:router="true">
    <el-menu-item index="1" route="ZeissHomePage">Contract Dealer</el-menu-item>
    <el-menu-item index="2" route="ZeissTask">My Task</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "TopNav",
    data () {
      return {
        activeIndex2: this.activeIndex
      }
    },
    props: ['activeIndex'],
    methods: {

    }
  }
</script>

<style scoped="scoped">
</style>

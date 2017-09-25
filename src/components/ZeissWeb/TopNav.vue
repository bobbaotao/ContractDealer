<template>
  <el-menu v-bind:default-active="activeIndex" class="el-menu-demo" mode="horizontal"
            v-bind:router="false" v-on:select="handleSelect">
    <el-menu-item index="MyCD" >My Contract Dealer</el-menu-item>
    <el-menu-item index="AllCD" >All Contract Dealer</el-menu-item>
    <el-menu-item index="MyTask" >My Task</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "TopNav",
    data () {
      return {
      }
    },
    props: ['activeIndex'],
    methods: {
      handleSelect(key, keyPath) {
       switch (key) {
         case "MyCD":
           this.$router.push({name: 'ZeissHomePage'});
           break;
         case "AllCD":
          this.$router.push({name: 'AllContractDealerPage'});
           break
         case "MyTask":
          this.$router.push({name: 'ZeissTask'});
          break;
         default:
           break;
       }
     }
    }
  }
</script>

<style scoped="scoped">
</style>

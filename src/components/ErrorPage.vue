<template>
  <el-row style="padding-top: 120px;">
    <el-col :span="20" :offset="2">
      <i class="el-icon-warning"></i> {{this.ErrorMessage}}
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'ErrorPage',
    data () {
      return {
        ErrorMessage: ""
      }
    },
    created: function() {
        if(this.$route.params && this.$route.params.errorMessage) {
          this.ErrorMessage = this.$route.params.errorMessage;
        }
        else {
          this.ErrorMessage = "some error!";
        }
    },
    methods: {

    }
  }
</script>

<stype scoped>
</style>

<template>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form :v-model="acFormData" ref="acFormData"  class="demo-dynamic" label-width="180px">
          <el-form-item prop="companyName" label="公司名称" :rule="{ required: true, message: '请输入公司名称', trigger: 'blur'}">
            <el-autocomplete v-model="acFormData.companyName" size="small" placeholder="请输入内容"
                            :fetch-suggestions="queryDealerAsync">
            </el-autocomplete>
          </el-form-item>
          <el-form-item prop="email" label="邮箱地址" :rule="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]">
            <el-input size="small" v-model="acFormData.email"></el-input>
          </el-form-item>

              <el-button type="primary" size="small" v-on:click="ValidateCompanyName" :disabled="isChecking">检查是否已注册
              </el-button>
              <el-button type="primary" size="small" v-on:click="ConnectNewCompany" :disabled="!isCompanyNameChecked">关联此公司
              </el-button>

        </el-form>
      </el-col>
    </el-row>
</template>

<script>
  import defaultData from './defaultData'

  export default {
    name: 'NewACCompany',
    data() {
      var CancelToken = this.axios.CancelToken;
      var source = CancelToken.source();
      return {
        acFormData : {
          companyName: '',
          email: ''
        },
        status: '',
        dealerId: '',
        axiosCancelSource: source,
        isCompanyNameChecked: false,
        isChecking: false,
      }
    },
    watch: {
      acFormData: function(newacFormData) {
        if(newacFormData.companyName != this.acFormData.companyName)
        {
          this.isCompanyNameChecked = false;
        }
      }
    },
    methods: {
      queryDealerAsync(queryString, cb) {
        var requestUrl = defaultData.serviceUrl + "?method=LoadDealerList&companyName=" + queryString;

        this.axiosCancelSource.cancel();
        this.axios.post(requestUrl, {
          cancelToken: this.axiosCancelSource.token
        }).then((response) => {
          if(response.status == "200" && response.data.Status == "success") {
            var result = response.data.Data;
            cb(result);
          }
        }).catch((error) => {
          console.dir(error);
        });
      },
      dealerNameSelected(item) {

      },
      ValidateCompanyName() {
        this.isChecking = true;
        var requestUrl = defaultData.serviceUrl + "?method=ValidateDealer&companyName=" + this.acFormData.companyName;

        this.axios.post(requestUrl).then((response) => {
          this.isChecking = false;
          if(response.status == "200" && response.data.Status == "success") {
              if(response.data.Data != "") {
                isCompanyNameChecked =  true;
              }
          }
        }).catch((error) => {
          this.isChecking = false;
        });
      },
      ConnectNewCompany() {
        this.$refs['acFormData'].validate((valid) => {
          if(valid) {

          } else {
            return false;
          }
        })
      }
    }
  }
</script>

<style>
</style>

<template>
    <el-row>
      <el-col :span="12" >
        <el-form :model="acFormData" ref="acFormData"  class="demo-dynamic" label-width="180px">
          <el-form-item prop="companyName" label="公司名称"
          :rules="{ required: true, message: '请输入公司名称', trigger: 'blur,change'}">
            <el-autocomplete v-model="acFormData.companyName" size="small" placeholder="请输入内容"
                            :fetch-suggestions="queryDealerAsync" @select="dealerNameSelected"
                            class="itemWidth">
            </el-autocomplete>
          </el-form-item>
          <el-form-item prop="email" label="邮箱地址" :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' }
          ]">
            <el-input size="small" :disabled="isEmailFromServer" v-model="acFormData.email" class="itemWidth"></el-input>
          </el-form-item>
          <el-button type="primary" size="small" v-on:click="ValidateCompanyName"
          :disabled="isChecking || isCompanyNameChecked">检查是否已注册
          </el-button>
          <el-button type="primary" size="small" v-on:click="ConnectNewCompany"
          :disabled="!isCompanyNameChecked">关联此公司
          </el-button>
          <br /><span>{{this.message}}</span>
        </el-form>
      </el-col>
      <el-col :span="8" :offset="1">
        填入公司名之后请先点击“检查是否注册”验证此公司是否已被邀请，未被邀请的公司在点击关联时会收到注册邮件，请联系被邀请的公司完成注册！
      </el-col>
    </el-row>
</template>

<script>
  import defaultData from '../defaultData'

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
          companyCode: '',
          axiosCancelSource: source,
          isCompanyNameChecked: false,
          isChecking: false,
          isEmailFromServer: false,
          message: ""
          //fullscreenLoading： false
      }
    },
    methods: {
      queryDealerAsync(queryString, cb) {
        var requestUrl = defaultData.serviceUrl + "?method=LoadDealerList&companyName=" + queryString;
        //resetData
        this.clearBind();
        this.message="请先验证该公司是否已注册！";
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
        //know issue for select
        //this.$refs['acFormData'].validate();
        this.dealerId = item.dealerId;
        this.status = item.status;
        this.acFormData.email = item.email,
        this.companyCode = item.companyCode;
        this.isCompanyNameChecked =  true;
        this.isEmailFromServer = true;
        this.message = "该公司已注册，请点击关联！"
      },
      ValidateCompanyName() {
        this.isChecking = true;
        //resetData
        this.clearBind();
        if(this.acFormData.companyName == "") {
          this.isChecking = false;
          return false;
        }
        var requestUrl = defaultData.serviceUrl + "?method=ValidateDealer&companyName=" + this.acFormData.companyName;

        // show loading view
        this.$emit("ShowLoadingView");
        this.axios.post(requestUrl).then((response) => {
          this.isChecking = false;
          this.$emit("HideLoadingView");
          if(response.status == "200" && response.data.Status == "success") {
            if(response.data.Data == null)
            {
              this.message = "该公司尚未注册，点击关联时系统会自动发送邀请邮件！"
              this.isCompanyNameChecked =  true;
              this.isEmailFromServer = false;
            } else {
                var dealerInfoFromServer = response.data.Data;
                if(dealerInfoFromServer.DealerId != null && dealerInfoFromServer.DealerId != "")
                {
                  this.isCompanyNameChecked =  true;
                  this.acFormData.email = dealerInfoFromServer.Email;
                  this.isEmailFromServer = true;
                  this.dealerId  = dealerInfoFromServer.DealerId;
                  this.companyCode = dealerInfoFromServer.CompanyCode;
                  this.message = "该公司已注册，请点击关联！"
                } else
                {
                  this.message = "该公司尚未注册，点击关联时系统会自动发送邀请邮件！"
                  this.isCompanyNameChecked =  true;
                  this.isEmailFromServer = false;
                }
              }
          }
        }).catch((error) => {
          this.isChecking = false;
          this.$emit("HideLoadingView");
        });
      },
      ConnectNewCompany() {
        this.$refs['acFormData'].validate((valid) => {
          if(valid) {
            var requestUrl =  defaultData.serviceUrl + "?method=AddACDealerMapping";
            var requestData = {
              MappingId: "0",
              DealerId: this.dealerId,
              DealNamec: this.acFormData.companyName,
              Email: this.acFormData.email,
              Status: this.status,
              CompanyCode: this.companyCode,
              MappingStatus: "0",
              MappingDocs: []
            };
            this.message = "";
            // show loading view
            this.$emit("ShowLoadingView");
            this.axios.post(requestUrl,requestData).then((response) => {
              this.$emit("HideLoadingView");
              if(response.status == "200" && response.data.Status == "success"){
                  this.$emit('reLoadACDealers');
                  this.reset();
                  this.message = "关联成功！";
              } else if (response.status == "200"){
                 this.$message.error(response.data.Message);
                 this.message = response.data.Message;
              } else {
                 this.$message.error(response.message);
                 this.message = response.message;
              }
            }).catch((error) => {
              this.$message.error('提交失败！');
              this.message = "提交失败";
              this.$emit("HideLoadingView");
            });
          } else {
            return false;
          }
        })
      },
      clearBind() {
        if(this.isCompanyNameChecked)
        {
          this.isCompanyNameChecked =  false;
          this.acFormData.email = "";
          this.isEmailFromServer = false;
          this.dealerId  = "";
          this.companyCode = "";
        }
      },
      reset: function() {
        this.acFormData.companyName = "";
        this.acFormData.email = "";
        this.status = "";
        this.dealerId = "";
        this.companyCode = "";
        this.message = "";
        this.isCompanyNameChecked = false;
        this.isChecking = false;
        this.isEmailFromServer = false;
      }
    }
  }
</script>

<style>
.itemWidth{
  width: 250px;
}
</style>

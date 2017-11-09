<template>
  <div>
    <el-row>
      <el-col :span="9" :offset="1">
        <el-row class="smallRow">
          <el-col :span="6">
            Division:
          </el-col>
          <el-col :span="16" :offset="1">
            {{division}}
          </el-col>
        </el-row>
        <el-row class="smallRow">
          <el-col :span="6">
          Sales Region:
          </el-col>
          <el-col :span="16" :offset="1">
            <el-select v-model="region" style="width:250px;"
                      placeholder="Please select region" v-on:change="selectSR">
              <el-option
                 v-for="item in regionList"
                 :key="item.Region"
                 :label="item.Region"
                 :value="item.Region">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="smallRow">
          <el-col :span="6">
            Resp. Sales
          </el-col>
          <el-col :span="16" :offset="1">
            <ZeissPeoplePicker ref="zpp"></ZeissPeoplePicker>
          </el-col>
        </el-row>
        <el-row class="smallRow">
          <el-col :span="6">
            Sales coordinator:
          </el-col>
          <el-col :span="16" :offset="1">
             {{coordinatorName}}
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" :offset="1" >
        <el-row class="smallRow">
          <el-col :span="6">
            Dealer Name:
          </el-col>
          <el-col :span="16" :offset="1">
            <el-input v-model="dealerName">
            </el-input>
          </el-col>
        </el-row>
        <el-row class="smallRow">
          <el-col :span="6">
            Dealer Email:
          </el-col>
          <el-col :span="16" :offset="1">
            <el-input v-model="dealerEmail">
            </el-input>
          </el-col>
        </el-row>
        <el-row class="smallRow">
          <el-col :span="6">
            Subject:
          </el-col>
          <el-col :span="16" :offset="1">
            <el-input v-model="subject">
            </el-input>
          </el-col>
        </el-row>
        <el-row class="smallRow">
          <el-col :span="6" :offset="6">
            <el-button type="primary" size="small" icon="message" v-on:click="InviteDealer">Invite Dealer</el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="small" v-on:click="close">
              Close
            </el-button>
          </el-col>
        </el-row>
        <el-row class="smallRow">
          <el-col class="errormsg">
            {{this.errorMessage}}
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import defaultData from '../defaultData';
  import ZeissPeoplePicker from './ZeissPeoplePicker';
  import { Loading } from 'element-ui';
  var validator = require("email-validator");

  export default {
    name: 'DealerInvite',
    data() {
      return {
                division: "MED",
                region: '',
                regionList: [],
                salesAccount: '',
                coordinatorAccount: '',
                dealerName: '',
                dealerEmail: '',
                coordinatorName: '',
                salesName: '',
                salesEmail: '',
                CoordinatorEmail: '',
                subject: '蔡司公司新经销商网上注册',
                errorMessage: ''
              }
    },
    components: {ZeissPeoplePicker},
    created: function() {
      this.LoadSalesConfig();
    },
    methods: {
      ShowLoadingView: function() {
        Loading.service({ fullscreen: true });
      },
      HideLoadingView: function() {
        let curLoadingInstance = Loading.service({ fullscreen: true });
        curLoadingInstance.close();
      },
      LoadSalesConfig: function() {
        var requestUrl = defaultData.cdServiceUrl + "/LoadRegionConfig/" +this.division;
        this.ShowLoadingView();

        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.data && response.data.LoadRegionConfigResult &&
            response.data.LoadRegionConfigResult.Status && response.data.LoadRegionConfigResult.Status == "success")
          {
            this.regionList = response.data.LoadRegionConfigResult.Data;

          } else if(response.data && response.data.LoadRegionConfigResult) {
            this.$message.error(response.data.LoadRegionConfigResult.Message);
          } else {
            this.$message.error(response.message);
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      selectSR: function() {
        var selectedItems = this.regionList.filter((item, index) => {
          if(item.Region == this.region) {
            return true;
          }
          return false;
        });

        var item = selectedItems[0];
        this.coordinatorAccount = item.CoordinatorAccount;
        this.loadUserInfo(item.CoordinatorAccount);
      },
      loadUserInfo: function(account) {
        var requestUrl = defaultData.cdServiceUrl + "/LoadUserInfo/" + account;
        this.ShowLoadingView();

        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.data && response.data.LoadUserInfoResult &&
            response.data.LoadUserInfoResult.Status && response.data.LoadUserInfoResult.Status == "success")
            {
              var userData = response.data.LoadUserInfoResult.Data;
              this.coordinatorName = userData.UserName;
              this.CoordinatorEmail = userData.Email;

            } else if(response.data && response.data.LoadUserInfoResult && response.data.LoadUserInfoResult.Status) {
              this.$message.error(response.data.LoadUserInfoResult.Message);
            } else {
              this.$message.error(response.message);
            }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      ValidateInfo: function() {
        this.errorMessage = "";
        if(this.region == null || this.region == "") {
          this.errorMessage = "请选择Sales Region!";
          return false;
        }
        if(this.$refs.zpp.userAccount == null || this.$refs.zpp.userAccount == "") {
          this.errorMessage = "请选择Sales!";
          return false;
        }
        if(this.dealerName == null || this.dealerName== "") {
          this.errorMessage = "请输入Dealer Name!";
          return false;
        }
        if(this.dealerEmail == null || this.dealerEmail== "") {
          this.errorMessage = "请输入Dealer Eamil!";
          return false;
        }
        if(!validator.validate(this.dealerEmail))
        {
          this.errorMessage = "Dealer Eamil不是正取的邮件地址!";
          return false;
        }
        if(this.subject == null || this.subject== "") {
          this.errorMessage = "请输入邮件Subject!";
          return false;
        }

        return true;
      },
      InviteDealer: function() {
        if(!this.ValidateInfo())
        {
          return;
        }
        var requestUrl = defaultData.cdServiceUrl + "/InviteDealer";
        var requestParam = {
          InviteDealerParam: {
            dealerName: this.dealerName,
            dealerEmail: this.dealerEmail,
            division: this.division,
            salesRegion: this.region,
            salesAccont: this.$refs.zpp.userAccount,
            coordinatorAccount: this.coordinatorAccount,
            subject: this.subject
          }
        };
        this.ShowLoadingView();

        this.axios.post(requestUrl, requestParam).then((response) => {
          this.HideLoadingView();
          if(response.data && response.data.InviteDealerResult && response.data.InviteDealerResult.Status == 'success') {
            this.$message("Action Success!");
            this.$emit("inviteDealerSuccess");
          } else if(response.data && response.data.InviteDealerResult) {
            this.errorMessage = response.data.InviteDealerResult.Message;
            this.$message.error(response.data.InviteDealerResult.Message);
          } else {
            this.errorMessage = response.message;
            this.$message.error(response.message);
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.errorMessage = error.message;
          this.$message.error(error.message);
        });
      },
      close: function()
      {
        this.$emit("close");
      }
    }
  }
</script>

<style scoped>
.smallRow {
  text-align: left;
  padding-top: 5px;
  padding-bottom: 10px;
}
.errormsg {
  color: red;
}
</style>

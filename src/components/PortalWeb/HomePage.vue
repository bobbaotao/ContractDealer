<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
  <span>确认提交之后将无法修改</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitToApproval">确 定</el-button>
  </span>
</el-dialog>
    <el-row class="middleRow">
      <el-col :span="20" :offset="2">
        <el-button type='primary' size="small" icon='upload' :disabled="!isAllowEditACDealer && !isAllowEditIECompany"
                    v-on:click="updateIECompanyData">保存</el-button>
        <el-button type='primary' size="small"  :disabled="!isAllowEditACDealer && !isAllowEditIECompany"
                    v-on:click="dialogVisible = true">提交审批</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22" :offset="1" class="titleRow">
        <span v-on:click="isShowACDealer = !isShowACDealer">
          <i class="el-icon-caret-bottom" v-if="isShowACDealer"></i>
          <i v-else class="el-icon-caret-right"></i>
        关联公司信息</span>
      </el-col>
    </el-row>
    <el-row  style="padding-top:10px; padding-bottom:10px;"  v-if="isShowACDealer">
      <el-col :span="24">
        <ACCompanyList v-bind:CompanyDatas="ACDealerDatas" v-bind:AllowEdit="isAllowEditACDealer"
                       v-on:reLoadACDealers="LoadACCompanyListFromServer"
                       v-on:ShowLoadingView="ShowLoadingView" v-on:HideLoadingView="HideLoadingView">
        </ACCompanyList>
      </el-col>
    </el-row>
    <el-row  style="padding-top:10px; "  v-if="isShowACDealer && isAllowEditACDealer">
      <el-col :span="24">
        <NewACCompany v-on:reLoadACDealers="LoadACCompanyListFromServer"
                      v-on:ShowLoadingView="ShowLoadingView" v-on:HideLoadingView="HideLoadingView">
        </NewACCompany>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span= "22" :offset="1" class="titleRow">
        <span v-on:click="isShowIECompany = !isShowIECompany">
          <i class="el-icon-caret-bottom" v-if="isShowIECompany"></i>
          <i v-else class="el-icon-caret-right"></i>
          IE Company 信息</span>
      </el-col>
    </el-row>
    <el-row style="padding-top:10px;" v-if="isShowIECompany">
      <el-col :span="24">
        <IECompany v-for="(IEData, index) of IECompanyDatas" ref="refIECompany" v-bind:initData="IEData"
                   v-bind:isInEdit="isAllowEditIECompany" v-bind:itemKey="index" v-bind:serviceUrl="serviceUrl"
                   v-on:ShowLoadingView="ShowLoadingView" v-on:HideLoadingView="HideLoadingView"
                   v-bind:baseUrl="baseUrl" v-on:deleteIEItem="RemoveIEItem">
        </IECompany>
      </el-col>
    </el-row>
    <el-row style="padding-top:10px; padding-bottom:10px;"  v-if="isShowIECompany && isAllowEditIECompany">
      <el-col>
        <el-button type='primary' size="small"
                  icon="plus" v-on:click="AddNewIECompany">新增IECompany</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import IECompany from './IECompany';
  import NewACCompany from './NewACCompany';
  import defaultData from '../defaultData';
  import ACCompanyList from './ACCompanyList';
  import { Loading } from 'element-ui';
  var array = require('array');

  export default {
    name: 'HomePage',
    data() {
      return {
        dialogVisible: false,
        isAllowEditIECompany: true,
        IECompanyDatas: [],
        baseUrl: defaultData.fileBaseUrl,//'http://10.22.83.55:8080/Service/FileUploadHandler.ashx',
        serviceUrl: defaultData.serviceUrl,//'http://10.22.83.55:8080/Service/DealerHandler.ashx'
        ACDealerDatas: [],
        isShowIECompany: true,
        isShowACDealer: true,
        isAllowEditACDealer: true,
        dealerStatus:"0"
      }
    },
    components: {IECompany, NewACCompany, ACCompanyList},
    created: function() {
      //this.LoadIECompanyFromServer();
      //this.LoadACCompanyListFromServer();
      this.LoadCurrentDealerDetailFromServer();
    },
    watch: {
      dealerStatus: function(newStatus) {
        if(newStatus == "0" || newStatus == "1") {
          this.isAllowEditACDealer = true;
          this.isAllowEditIECompany = true;
        } else {
          this.isAllowEditACDealer = false;
          this.isAllowEditIECompany = false;
        }
      }
    },
    methods: {
      ShowLoadingView: function() {
        Loading.service({ fullscreen: true });
      },
      HideLoadingView: function() {
        let curLoadingInstance = Loading.service({ fullscreen: true });
        curLoadingInstance.close();
      },
      AddNewIECompany: function() {
        var IECompanys = this.$refs.refIECompany;
        var CollectedData = new array();
        for(var ieKey in IECompanys) {
          var ieItem = IECompanys[ieKey];
          if(!ieItem.validateIECompanyData()) {
            this.$message.error("请检查信息是否完整！");
            return;
          }
        };
        var newItem = defaultData.newIECompany();
        this.IECompanyDatas.push(newItem);
      },
      LoadCurrentDealerDetailFromServer: function() {
        var requestUrl = this.serviceUrl + "?method=LoadCurrentDealerInfo";
        this.ShowLoadingView();
        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.status == "200" && response.data.Status == "success") {
            var curDealerDetail = response.data.Data;
            if(curDealerDetail.DealerType != "2") {
              //this.$router.push
              this.$router.push({name: 'ErrorPage', params: {errorMessage: "对不起，本页面仅对合同经销商开放！"}});
            } else {
              this.dealerStatus = curDealerDetail.DealerStatus;
              this.ACDealerDatas = curDealerDetail.ACDealers;
              //set IE Company
              var ieCompanyArr = new array();
              for(var resKey in curDealerDetail.IECompanys) {
                var resCompanyInfo = curDealerDetail.IECompanys[resKey];
                ieCompanyArr.push(defaultData.getIEItemFromServerData(resCompanyInfo));
              }
              this.IECompanyDatas = ieCompanyArr.toArray();
            }
          } else if(response.status == "200") {
            this.$message.error(response.data.Message);
          } else {
            this.$message.error(response.message);
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      LoadACCompanyListFromServer: function() {
        var requestUrl = this.serviceUrl + "?method=GetACDealerInfo";
        this.ShowLoadingView();
        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.status == "200" && response.data.Status == "success") {
            this.ACDealerDatas = response.data.Data;
          } else if(response.status == "200") {
            this.$message.error(response.data.Message);
          } else {
            this.$message.error(response.message);
          }
        }).catch((error) => {
            this.HideLoadingView();
            this.$message.error(error.message);
        });
      },
      LoadIECompanyFromServer: function() {
        var requestUrl =  this.serviceUrl + "?method=GetIECompany";
        this.ShowLoadingView();
        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          //console.dir(response);
          if(response.status == "200" && response.data.Status == "success") {
            var resCompanyInfos = response.data.Data;
            var ieCompanyArr = new array();
            for(var resKey in resCompanyInfos) {
              var resCompanyInfo = resCompanyInfos[resKey];
              ieCompanyArr.push(defaultData.getIEItemFromServerData(resCompanyInfo));
            }
            this.IECompanyDatas = ieCompanyArr.toArray();
          } else {
            console.dir(response);
          }
        }).catch((error) => {
          this.HideLoadingView();
          console.dir(error);
        });
      },
      UpdateData: function() {

      },
      submitToApproval: function() {
        this.dialogVisible = false;
        var requestUrl = this.serviceUrl + "?method=SubmitApproval";
        //submit to approval is to save ie company datas and submit to server
        //load requestData
        var IECompanys = this.$refs.refIECompany;
        var CollectedData = new array();
        for(var ieKey in IECompanys) {
          var ieItem = IECompanys[ieKey];
          if(!ieItem.validateIECompanyData()) {
            this.$message.error("请检查信息是否完整！");
            return;
          }
          var ieData = defaultData.formartToPostData(ieItem); //translate to post data
          CollectedData.push(ieData);
        };
        var requestData = CollectedData.toArray();

        this.ShowLoadingView();
        this.axios.post(requestUrl,requestData).then((response) => {
          this.HideLoadingView();
          if(response.status == "200" && response.data.Status == "success") {
            //TODO;
            this.$message("提交审批成功！");
            //this.dealerStatus = "2";
            this.LoadCurrentDealerDetailFromServer();
          } else if(response.status == "200") {
            this.$message.error(response.data.Message);
          } else {
            this.$message.error(response.message);
          }

        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      updateIECompanyData: function() {
        var requestUrl = this.serviceUrl + "?method=UpdateIECompany";
        //load requestData
        var IECompanys = this.$refs.refIECompany;
        var CollectedData = new array();
        for(var ieKey in IECompanys) {
          var ieItem = IECompanys[ieKey];
          if(!ieItem.validateIECompanyData()) {
            this.$message.error("请检查信息是否完整！");
            return;
          }
          var ieData = defaultData.formartToPostData(ieItem); //translate to post data
          CollectedData.push(ieData);
        };
        var requestData = CollectedData.toArray();

        this.ShowLoadingView();
        this.axios.post(requestUrl,requestData).then((response) => {
          this.HideLoadingView();
          if(response.status == "200" && response.data.Status == "success") {
            //TODO;
            this.$message("保存成功！");
          } else if(response.status == "200") {
            this.$message.error(response.data.Message);
          } else {
            this.$message.error(response.message);
          }

        }).catch((error) => {
          this.HideLoadingView();
          this.$message.error(error.message);
        });
      },
      RemoveIEItem: function(itemKey) {
        var IECompanys = this.$refs.refIECompany;
        var CollectedData = new array();
        for(var ieKey in IECompanys) {
          var ieItem = IECompanys[ieKey];
          if(ieItem.itemKey != itemKey)
          {
            var ieData = defaultData.getIEItemFromData(ieItem);
            CollectedData.push(ieData);
          }
        };
        this.IECompanyDatas = CollectedData.toArray();
      }
    }
  }
</script>

<style scoped>
.middleRow
{
  padding-bottom: 10px;
}
.titleRow
{
  background-color: #428bca;
  float: left;
  text-align: left;
  margin-top: 10px;
  line-height: 32px;
}
</style>

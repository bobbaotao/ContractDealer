<template>
  <div>
    <el-row class="middleRow">
      <el-col :span="10" :offset="2">
        <el-button type='primary' icon="plus" v-on:click="AddNewIECompany">新增IECompany</el-button>
        <el-button type='primary' icon='upload' v-on:click="updateIECompanyData">保存</el-button>
      </el-col>
    </el-row>
    <IECompany v-for="(IEData, index) of IECompanyDatas" ref="refIECompany" v-bind:initData="IEData"
               v-bind:isInEdit="AllowEditIECompany" v-bind:itemKey="index"
               v-bind:baseUrl="baseUrl" v-on:deleteIEItem="RemoveIEItem">
    </IECompany>
  </div>
</template>

<script>
  import IECompany from './IECompany'
  import defaultData from './defaultData'
  var array = require('array');

  export default {
    name: 'HomePage',
    data() {
      return {
        AllowEditIECompany: true,
        IECompanyDatas: [],
        baseUrl: defaultData.fileBaseUrl,//'http://10.22.83.55:8080/Service/FileUploadHandler.ashx',
        serviceUrl: defaultData.serviceUrl,//'http://10.22.83.55:8080/Service/DealerHandler.ashx'
      }
    },
    components: {IECompany},
    created: function() {
      this.LoadIECompanyFromServer();
    },
    methods: {
      AddNewIECompany: function() {
        var newItem = defaultData.newIECompany();
        this.IECompanyDatas.push(newItem);
      },
      LoadIECompanyFromServer: function() {
        var requestUrl =  this.serviceUrl + "?method=GetIECompany";
        this.axios.post(requestUrl).then((response) => {
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
          console.dir(error);
        });
      },
      UpdateData: function() {

      },
      updateIECompanyData: function() {
        var requestUrl = this.serviceUrl + "?method=UpdateIECompany";
        //load requestData
        var IECompanys = this.$refs.refIECompany;
        var CollectedData = new array();
        for(var ieKey in IECompanys) {
          var ieItem = IECompanys[ieKey];
          var ieData = defaultData.formartToPostData(ieItem); //translate to post data
          CollectedData.push(ieData);
        };
        var requestData = CollectedData.toArray();

        this.axios.post(requestUrl,requestData).then((response) => {
          console.dir(response);
        }).catch((error) => {
          console.dir(error);
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
</style>

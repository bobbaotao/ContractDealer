<template>
  <div>
    <el-row class="smallRow">
      <el-col class="smallCol" :span="7" :offset="1" v-for="item in certFileList">
        <a :href="fileBaseUrl + '?method=loadDealerCert&fileid=' + item.FileID">{{item.FileName}}</a>
        <el-button size="small" icon="delete" v-on:click="deleteFile(item.FileID)"></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="smallCol" :offset="2" :span="12">
        <el-upload
          class="upload-demo"
          :action="this.fileBaseUrl + '?method=uploadDealerCert&dealerID=' + this.dealerId"
          :show-file-list="false" :on-progress="FileProcess" :on-error="FileUploadFailed"
          :on-success="FileUploadSuccess" >
          <el-button size="samll"
            type="primary" icon="upload">Upload Cert</el-button>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import defaultData from '../defaultData';
  import { Loading } from 'element-ui';

  export default {
    name: 'DealerAuthCertMgr',
    data() {
      return {
        certFileList: [],
        fileBaseUrl: defaultData.zeissFileBaseUrl
      }
    },
    props : ['dealerId'],
    created: function() {
      this.LoadCertListFromServer();
    },
    methods: {
      ShowLoadingView: function() {
        Loading.service({ fullscreen: true });
      },
      HideLoadingView: function() {
        let curLoadingInstance = Loading.service({ fullscreen: true });
        curLoadingInstance.close();
      },
      FileProcess: function() {
        this.ShowLoadingView();
      },
      FileUploadFailed: function(err, file, fileList) {
        this.HideLoadingView();
        this.$message(err.message);
      },
      FileUploadSuccess: function(response, file, fileList) {
        this.HideLoadingView();
        this.LoadCertListFromServer();
      },
      CloseWindow: function() {
        this.$emit("close");
      },
      LoadCertListFromServer: function() {
        var requestUrl = defaultData.cdServiceUrl + "/LoadDealerCerts/" + this.dealerId;
        this.ShowLoadingView();

        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();
          if(response.data && response.data.LoadDealerCertsResult && response.data.LoadDealerCertsResult.Status == "success")
          {
            this.certFileList = response.data.LoadDealerCertsResult.Data;
          } else if(response.data && response.data.LoadDealerCertsResult)
          {
            this.$mesage.error(response.data.LoadDealerCertsResult.Message);
          } else {
            this.$mesage.error(response.message);
          }

        }).catch((error) => {
          this.HideLoadingView();
          this.$mesage.error(error.message);
        });
      },
      deleteFile: function(fileid) {
        var requestUrl = defaultData.cdServiceUrl + "/DeleteDealerCert/" + this.dealerId + "/" + fileid;
        this.ShowLoadingView();

        this.axios.post(requestUrl).then((response) => {
          this.HideLoadingView();

          if(response.data && response.data.DeleteDealerCertResult && response.data.DeleteDealerCertResult.Status == "success") {
            this.LoadCertListFromServer();
          } else if (response.data && response.data.DeleteDealerCertResult) {
            this.$mesage.error(response.data.DeleteDealerCertResult.Message);
          } else {
            this.$mesage.error(response.message);
          }
        }).catch((error) => {
          this.HideLoadingView();
          this.$mesage.error(error.message);
        });
      }
    }
  }
</script>

<style scoped>
.smallRow {
  padding-top: 5px;
  padding-bottom: 10px;
}
.smallCol {
  padding-bottom: 5px;
  text-align:left;
  word-break: break-all;
}
</style>

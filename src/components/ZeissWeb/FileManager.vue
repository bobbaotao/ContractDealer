<template>
  <div style="text-align:left">
    <el-row class="sectionTitle2">
      <el-col>
        Legal File
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <a target="blank" class="zeisslink"
          :href="this.fileSvcUrl + '?method=load&fileid=' + this.fileID "
          download>
          {{FileName}}
        </a>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-upload
          class="upload-demo" :disabled="!AllowUpload"
          :action="this.fileSvcUrl + '?method=uploadLegalFile&dealerID=' + this.dealerId"
          :show-file-list="false" :on-progress="FileProcess" :on-error="FileUploadFailed"
         :on-success="FileUploadSuccess" >
          <el-button size="mini" :disabled="!AllowUpload"
            type="primary" icon="upload">Upload Legal File</el-button>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import defaultData from '../defaultData';
  import { Loading } from 'element-ui';

  export default {
    name: 'FileManager',
    data() {
      return{
        fileSvcUrl: defaultData.zeissFileBaseUrl
      }
    },
    components: {},
    props: ['FileName', 'fileID', 'dealerId', 'AllowUpload'],
    created: function() {

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
        this.$emit('ReloadDealerInfo', response, file.name);
      }
    }
  }
</script>

<style scoped>
.zeisslink {
  word-break: break-all;
  display: inline-block;

}
.sectionTitle2 {
  background-color: rgba(202, 219, 236);
  color: rgba(107, 145, 188);
  font-size: 16px;
  line-height: 24px;
  padding: 3px;
  text-align: left;
}
</style>

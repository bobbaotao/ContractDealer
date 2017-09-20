<template>
  <div>
    <!-- <el-row>
      <el-col :span="6"> -->
        <el-upload
          class="upload-demo" :disabled="this.uploadDisable || !this.AllowEdit"
          :action="this.baseUrl + '?method=upload'"  :on-preview="FileOnPreview"
          :show-file-list="true" :on-progress="FileProcess" :on-error="FileUploadFailed"
          :file-list="fileList" :on-success="FileUploadSuccess" :on-remove="FileRemove">
          <el-button size="mini" :disabled="this.uploadDisable || !this.AllowEdit"
          type="primary" icon="upload">点击上传</el-button>
        </el-upload>
      <!-- </el-col>
      <el-col :span="18">
        <el-row>
          <a v-for="item in fileList" :href=""></a>
        </el-row>
      </dl-col>
    </el-row> -->
  </div>
</template>

<script>
  import defaultData from '../defaultData'
  var array = require('array');

  export default {
    name: "DMFilerMgr",
    data () {
      return {
        baseUrl: defaultData.fileBaseUrl,
        uploadDisable: false,
        fileList: [],
        serviceUrl: defaultData.serviceUrl
        //fileInfos: []
        //,
        //maindData:
        //fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

      }
    },
    props: ['dealerInfo','AllowEdit'],
    // watch
    created: function() {
      //this.fileInfos = this.dealerInfo.MappingDocs;
      this.SetFileList();
    },
    methods: {
      SetFileList() {
        if(this.dealerInfo.MappingDocs != null) {
          var fileArr = new array();
          for(var key in this.dealerInfo.MappingDocs) {
            var item = this.dealerInfo.MappingDocs[key];
            fileArr.push({
              name: item.FileName,
              url: defaultData.fileBaseUrl + "?method=load&fileid=" + item.FileID,
              id: item.FileID
            });
          }
          this.fileList = fileArr.toArray();
        }
      },
      FileProcess(event, file, fileList) {
        this.$emit("ShowLoadingView");
        this.uploadDisable = true;
      },
      FileUploadFailed(err, file, fileList) {
        this.$message("上传失败！");
        this.uploadDisable = false;
        this.$emit("HideLoadingView");
      },
      FileOnPreview(file) {
        if(file != null && file.name != null && file.url != null)
        {
          var link = document.createElement("a");
          link.download = file.name;
          link.href = file.url;
          link.click();
        }
      },
      FileUploadSuccess(response, file, fileList) {
        var requestUrl = this.serviceUrl + "?method=UpdateACDealerMappingDocInfo";
        fileList.pop();
        fileList.push({
          name: file.name,
          url: defaultData.fileBaseUrl + "?method=load&fileid=" + response,
          id: response
         }); //重新添加尾项
         this.fileList = fileList;
         var postData = this.GetPostData();
        this.axios.post(requestUrl,postData).then((response) => {
          this.$emit("HideLoadingView");
          this.uploadDisable = false;
          if(response.status == "200" && response.data.Status == "success") {
            //this.ACDealerDatas = response.data.Data;
            this.$message("上传成功！");
          } else if(response.status == "200") {
            this.$message.error(response.data.Message);
          } else {
            this.$message.error(response.message);
          }
        }).catch((error) => {
          this.$emit("HideLoadingView");
          this.uploadDisable = false;
          this.$message.error(error.message);
        });

      },
      FileRemove(file,fileList) {
        this.uploadDisable = true;
        var requestUrl = this.serviceUrl + "?method=UpdateACDealerMappingDocInfo";
        this.fileList = fileList;
        var postData = this.GetPostData();
        this.$emit("ShowLoadingView");
        this.axios.post(requestUrl,postData).then((response) => {
          this.$emit("HideLoadingView");
          this.uploadDisable = false;
          if(response.status == "200" && response.data.Status == "success") {
            //this.ACDealerDatas = response.data.Data;
            this.$message("删除文件成功！");
          } else if(response.status == "200") {
            this.$message.error(response.data.Message);
          } else {
            this.$message.error(response.message);
          }
        }).catch((error) => {
          this.$emit("HideLoadingView");
          this.uploadDisable = false;
          this.$message.error(error.message);
        });
      },
      GetPostData: function() {
        var fileInfos = new array();
        if(this.fileList != null)
        {
          for(var key in this.fileList)
          {
              var item = this.fileList[key];
              if(item.id != null && item.id != "0" && item.id != 0)
              {
                fileInfos.push({
                  FileName: item.name,
                  FileID: item.id
                });
              } else if(item.status == "success")
              {
                fileInfos.push({
                  FileName: item.name,
                  FileID: item.response.toString()
                });
              }
          }
        }
        return {
          MappingId: this.dealerInfo.MappingId,
          DealerId: this.dealerInfo.DealerId,
          DealNamec: this.dealerInfo.DealNamec,
          Email: this.dealerInfo.Email,
          Status: this.dealerInfo.Status,
          MappingStatus: this.dealerInfo.MappingStatus,
          CompanyCode: this.dealerInfo.CompanyCode,
          MappingDocs: fileInfos.toArray()
        }
      }
    }
  }
</script>

<style scoped>
</style>

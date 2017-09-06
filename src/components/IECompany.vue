<template>
  <div >
    <el-row :gutter="5" class="middleRow">
      <el-col :span="3" :offset="1" class="fontColumnTitle">
        IE Company名称
      </el-col>
      <el-col :span="4" class="fontColumnTitle">
        <el-input placehoder="请填写IE Company名称" v-model="companyName" :disabled="!this.isInEdit"></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="delete" v-on:click="onRemoveItem">删除
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="5" class="middleRow">
      <el-col :span="3" :offset="1" class="fontColumnTitle">
        IE Company证件
      </el-col>
      <el-col :span="2" class="fontColumnTitle">
        <el-checkbox v-model="isThreeInOne" :disabled="!this.isInEdit">三证合一</el-checkbox>
      </el-col>
    </el-row>
    <el-row class="middleRow">
      <el-col :span="3" :offset="4" class="fontColumnTitle">
        <div class="divFileTitle">
          Business license(copy)<br />
          营业执照（复印件加盖公章）<br />
          无有效期请留空
        </div>
      </el-col>
      <el-col :span="6">
          <el-row  class="middleRow">
            <el-col :span="18" style="text-align:left; padding-left:5px;">
              &nbsp;
              <div class="fontColumnTitle fileurl" v-if="this.blfile.url == ''">
                {{this.blfile.name}} <span class="fileStatus">{{this.blfile.status}}</span>
              </div>
              <div class="fontColumnTitle" v-else>
                <a v-on:href="this.blfile.url" target="_blank" download>{{this.blfile.name}}</a>
              </div>
            </el-col>

            <el-col :span="6">
              <el-upload
                class="upload-demo" :disabled="!this.isInEdit || this.bluploadDisable"
                action="http://10.22.83.55:8080/Service/FileUploadHandler.ashx?method=upload"
                :show-file-list="false" :on-progress="blFileProcess" :on-error="blFileUploadFailed"
                :file-list="blfileList" :on-success="blFileUploadSuccess">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18" style="text-align:left; padding-left:5px;">
              <el-date-picker v-model="blDate" type="date" placeholder="选择日期"
              :disabled="!this.isInEdit">
              </el-date-picker>
            </el-col>
            <el-col :span="6" style="line-height: 28px;" class="fontColumnTitle">
              （有效期）
            </el-col>
          </el-row>
      </el-col>
    </el-row>
    <el-row class="middleRow" v-if="!this.isThreeInOne">
      <el-col :span="3" :offset="4" class="fontColumnTitle">
        <div class="divFileTitle">
          Tex registration certificate(copy)<br />
          税务登记（复印件加盖公章）<br />
          无有效期请留空
        </div>
      </el-col>
      <el-col :span="6">
        <el-row  class="middleRow">
          <el-col :span="18" style="text-align:left; padding-left:5px;">
            <div class="fontColumnTitle fileurl" v-if="this.trcfile.url == ''">
              &nbsp;{{this.trcfile.name}} <span class="fileStatus">{{this.trcfile.status}}</span>
            </div>
            <div class="fontColumnTitle" v-else>
              <a v-on:href="this.trcfile.url" target="_blank">{{this.trcfile.name}}</a>
            </div>
          </el-col>
          <el-col :span="6">
            <el-upload
              class="upload-demo" :disabled="this.trcuploadDisable || !this.isInEdit"
              action="http://10.22.83.55:8080/Service/FileUploadHandler.ashx?method=upload"
              :show-file-list="false" :on-progress="trcFileProcess" :on-error="trcFileUploadFailed"
              :file-list="trcfileList" :on-success="trcFileUploadSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" style="text-align:left; padding-left:5px;">
            <el-date-picker v-model="trcDate" type="date" placeholder="选择日期"
            :disabled="!this.isInEdit">
            </el-date-picker>
          </el-col>
          <el-col :span="6" style="line-height: 28px;"  class="fontColumnTitle">
            （有效期）
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3" :offset="1" class="fontColumnTitle">
        <div class="divFileTitle">
          Organization certificate(copy) <br />
          组织代码证（复印件加盖公章）<br />
          无有效期请留空
        </div>
      </el-col>
      <el-col :span="6">
        <el-row  class="middleRow">
          <el-col :span="18" style="text-align:left; padding-left:5px;">
            <div class="fontColumnTitle fileurl" v-if="this.ocfile.url == ''">
              &nbsp;{{this.ocfile.name}} <span class="fileStatus">{{this.ocfile.status}}</span>
            </div>
            <div class="fontColumnTitle" v-else>
              <a v-on:href="this.ocfile.url" target="_blank">{{this.ocfile.name}}</a>
            </div>
          </el-col>
          <el-col :span="6">
            <el-upload
              class="upload-demo" :disabled="this.ocuploadDisable || !this.isInEdit"
              :action="this.baseUrl + '?method=upload'"
              :show-file-list="false" :on-progress="ocFileProcess" :on-error="ocFileUploadFailed"
              :file-list="ocfileList" :on-success="ocFileUploadSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" style="text-align:left; padding-left:5px;">
            <el-date-picker v-model="ocDate" type="date" placeholder="选择日期" :disabled="!this.isInEdit">
            </el-date-picker>
          </el-col>
          <el-col :span="6" style="line-height: 28px;"  class="fontColumnTitle">
            （有效期）
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'IECompany',
    props: ['initData','baseUrl','isInEdit', 'itemKey'],
    data() {
      return {
        companyInfoId: this.initData.companyInfoId,
        companyName: this.initData.companyName,//"",
        isThreeInOne: this.initData.isThreeInOne,//false,
        //isInEdit: true,
        // business lience info.
        blDate: this.initData.blDate,//null,
        bluploadDisable: false,
        blfileList:[],
        blfile: this.initData.blfile,
        // blfile: {
        //   name: '等待上传',
        //   url: '',
        //   status: '',
        //   fileId: ''
        // },
        // Tax registration certificate
        trcDate: this.initData.trcDate, //null,
        trcuploadDisable: false,
        trcfileList: [],
        trcfile: this.initData.trcfile,
        // trcfile: {
        //   name: '等待上传',
        //   url: '',
        //   status: '',
        //   fileId: ''
        // },
        //Organization certificate
        ocDate: this.initData.ocDate,//null,
        ocuploadDisable: false,
        ocfileList: [],
        ocfile: this.initData.ocfile
        // ocfile: {
        //   name: '等待上传',
        //   url: '',
        //   status: '',
        //   fileId: ''
        // }
      }
    },
    methods: {
      // fileuploadCompleted(file, status, xhr) {
      //   console.log(xhr.response.data);
      // }
        blFileProcess(event, file, fileList) {
          this.blfile.name = file.name;
          this.blfile.status = "上传中";
          this.blfile.url = "";
          this.blfile.fileId = 0;
          this.bluploadDisable = true;
        },
        blFileUploadFailed(err, file, fileList) {
          this.blfile.name = file.name;
          this.blfile.status = "上传失败";
          this.blfile.url = "";
          this.blfile.fileId = 0;
          this.bluploadDisable = false;
        },
        blFileUploadSuccess(response, file, fileList) {
          this.blfile.name = file.name;
          this.blfile.status = "";
          this.bluploadDisable = false;
          this.blfile.fileId = response;
          this.blfile.url = this.baseUrl + "?method=load&fileid=" +response;
        },
        trcFileProcess(event, file, fileList) {
          this.trcfile.name = file.name;
          this.trcfile.status = "上传中";
          this.trcfile.url = "";
          this.blfile.fileId = 0;
          this.trcuploadDisable = true;
        },
        trcFileUploadFailed(err, file, fileList) {
          this.trcfile.name = file.name;
          this.trcfile.status = "上传失败";
          this.trcfile.url = "";
          this.blfile.fileId = 0;
          this.trcuploadDisable = false;
        },
        trcFileUploadSuccess(response, file, fileList) {
          this.trcfile.name = file.name;
          this.trcfile.status = "";
          this.trcuploadDisable = false;
          this.blfile.fileId = response;
          this.trcfile.url = this.baseUrl + "?method=load&fileid=" +response;
        },
        ocFileProcess(event, file, fileList) {
          this.ocfile.name = file.name;
          this.ocfile.status = "上传中";
          this.ocfile.url = "";
          this.blfile.fileId = 0;
          this.ocuploadDisable = true;
        },
        ocFileUploadFailed(err, file, fileList) {
          this.ocfile.name = file.name;
          this.ocfile.status = "上传失败";
          this.ocfile.url = "";
          this.blfile.fileId = 0;
          this.ocuploadDisable = false;
        },
        ocFileUploadSuccess(response, file, fileList) {
          this.ocfile.name = file.name;
          this.ocfile.status = "";
          this.ocuploadDisable = false;
          this.blfile.fileId = response;
          this.ocfile.url = this.baseUrl + "?method=load&fileid=" +response;
        },
        onRemoveItem() {
          this.$emit('deleteIEItem', this.itemKey);
        },
        validateIECompanyData() {

        }
    },
    watch: {
      initData: function(newInitData) {
        this.companyInfoId = newInitData.companyInfoId;
        this.companyName = newInitData.companyName;
        this.isThreeInOne = newInitData.isThreeInOne;
        this.blDate = newInitData.blDate;
        this.blfile = newInitData.blfile;
        this.trcDate = newInitData.trcDate;
        this.trcfile = newInitData.trcfile;
        this.ocDate = newInitData.ocDate;
        this.ocfile = newInitData.ocfile;
      }
    }

  }
</script>

<style scoped>
.fontColumnTitle
{
  font-size: 12px;
  float: left;
  text-align: left;
  vertical-align: middle;
  line-height: 20px;
}
.middleRow
{
  padding-bottom: 10px;
}
.divButton
{
  border: 1px solid black;
  padding: 3px;
}
.divFileTitle
{
  padding-top: 10px;
}
.fileStatus
{
  float: right;
  text-align: right;
}
.fileurl
{
  word-break: break-all;
}
.uploadStatus
{
  color: rgb(250, 191, 143);
}
</style>

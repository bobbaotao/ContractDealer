<template>
  <div >
    <el-row :gutter="5" class="middleRow">
      <el-col :span="4" :offset="1" class="fontColumnTitle">
        IE Company名称
      </el-col>
      <el-col :span="4" class="fontColumnTitle">
        <el-input placehoder="请填写IE Company名称" size="small"
                  v-model="companyName" :disabled="!this.isInEdit"></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" icon="delete" :disabled="!this.isInEdit"
                  size="small" v-on:click="onRemoveItem">删除
        </el-button>
      </el-col>
      <el-col :span="10" :offset="1">
        <span style="color:red;">{{this.errorMessage}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="5" class="middleRow">
      <el-col :span="4" :offset="1" class="fontColumnTitle">
        IE Company证件
      </el-col>
      <el-col :span="2" class="fontColumnTitle">
        <el-checkbox v-model="isThreeInOne" :disabled="!this.isInEdit">三证合一</el-checkbox>
      </el-col>
    </el-row>
    <el-row class="middleRow">
      <el-col :span="4" :offset="1" class="fontColumnTitle">
        <div class="divFileTitle">
          Business license(copy)<br />
          营业执照（复印件加盖公章）<br />
          无有效期请留空
        </div>
      </el-col>
      <el-col :span="7">
          <el-row  class="middleRow">
            <el-col :span="16" style="text-align:left; padding-left:5px;">
              <!-- <div class="fontColumnTitle fileurl" v-if="this.blfile.url == ''">
                {{this.blfile.name}} <span class="fileStatus">{{this.blfile.status}}</span>
              </div> -->
              <div class="fontColumnTitle" >
                <a :href="this.blfile.url" target="_blank" download><span style="word-break: break-all">{{this.blfile.name}}</span></a>
              </div>
            </el-col>

            <el-col :span="6" :offset="1">
              <el-upload
                class="upload-demo" :disabled="!this.isInEdit || this.bluploadDisable"
                :action="this.baseUrl + '?method=upload'"
                :show-file-list="false" :on-progress="blFileProcess" :on-error="blFileUploadFailed"
                :file-list="blfileList" :on-success="blFileUploadSuccess">
                <el-button size="small" type="primary"  icon="upload"
                  :disabled="!this.isInEdit || this.bluploadDisable">点击上传</el-button>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" style="text-align:left; padding-left:5px;">
              <el-date-picker v-model="blDate" type="date" placeholder="选择日期"
              :disabled="!this.isInEdit"  size="small">
              </el-date-picker>
            </el-col>
            <el-col :span="6" :offset="1" style="line-height: 28px;" class="fontColumnTitle">
              （有效期）
            </el-col>
          </el-row>
      </el-col>

    </el-row>
    <el-row class="middleRow" v-if="!this.isThreeInOne">
      <el-col :span="4" :offset="1" class="fontColumnTitle">
        <div class="divFileTitle">
          Tex registration certificate(copy)<br />
          税务登记（复印件加盖公章）<br />
          无有效期请留空
        </div>
      </el-col>
      <el-col :span="7">
        <el-row  class="middleRow">
          <el-col :span="16" style="text-align:left; padding-left:5px;">
            <!-- <div class="fontColumnTitle fileurl" v-if="this.trcfile.url == ''">
              &nbsp;{{this.trcfile.name}} <span class="fileStatus">{{this.trcfile.status}}</span>
            </div> -->
            <div class="fontColumnTitle">
              <a :href="this.trcfile.url" target="_blank"><span style="word-break: break-all">{{this.trcfile.name}}</span></a>
            </div>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-upload
              class="upload-demo" :disabled="this.trcuploadDisable || !this.isInEdit"
              :action="this.baseUrl + '?method=upload'"
              :show-file-list="false" :on-progress="trcFileProcess" :on-error="trcFileUploadFailed"
              :file-list="trcfileList" :on-success="trcFileUploadSuccess">
              <el-button size="small"  :disabled="this.trcuploadDisable || !this.isInEdit"
                type="primary" icon="upload">点击上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" style="text-align:left; padding-left:5px;">
            <el-date-picker v-model="trcDate" type="date" placeholder="选择日期"
            :disabled="!this.isInEdit"  size="small">
            </el-date-picker>
          </el-col>
          <el-col :span="6" :offset="1" style="line-height: 28px;"  class="fontColumnTitle">
            （有效期）
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" :offset="1" class="fontColumnTitle">
        <div class="divFileTitle">
          Organization certificate(copy) <br />
          组织代码证（复印件加盖公章）<br />
          无有效期请留空
        </div>
      </el-col>
      <el-col :span="7">
        <el-row  class="middleRow">
          <el-col :span="16" style="text-align:left; padding-left:5px;">
            <!-- <div class="fontColumnTitle fileurl" v-if="this.ocfile.url == ''">
              &nbsp;{{this.ocfile.name}} <span class="fileStatus">{{this.ocfile.status}}</span>
            </div> -->
            <div class="fontColumnTitle" >
              <a :href="this.ocfile.url" target="_blank"><span style="word-break: break-all">{{this.ocfile.name}}</span></a>
            </div>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-upload
              class="upload-demo" :disabled="this.ocuploadDisable || !this.isInEdit"
              :action="this.baseUrl + '?method=upload'"
              :show-file-list="false" :on-progress="ocFileProcess" :on-error="ocFileUploadFailed"
              :file-list="ocfileList" :on-success="ocFileUploadSuccess">
              <el-button size="small" :disabled="this.ocuploadDisable || !this.isInEdit"
              type="primary" icon="upload">点击上传</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" style="text-align:left; padding-left:5px;">
            <el-date-picker v-model="ocDate" type="date" placeholder="选择日期"
                :disabled="!this.isInEdit"  size="small">
            </el-date-picker>
          </el-col>
          <el-col :span="6" :offset="1" style="line-height: 28px;"  class="fontColumnTitle">
            （有效期）
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="middleRow">
      <el-col :span="4" :offset="1" class="fontColumnTitle">
        <div class="divFileTitle">
          Medical Device Operation License<br />
          医疗器械经营许可证（复印件加盖公章）<br />
          无有效期请留空
        </div>
      </el-col>
      <el-col :span="7">
          <el-row  class="middleRow">
            <el-col :span="16" style="text-align:left; padding-left:5px;">
              <!-- <div class="fontColumnTitle fileurl" v-if="this.blfile.url == ''">
                {{this.blfile.name}} <span class="fileStatus">{{this.blfile.status}}</span>
              </div> -->
              <div class="fontColumnTitle" >
                <a :href="this.mlfile.url" target="_blank" download>
                  <span style="word-break: break-all">{{this.mlfile.name}}</span></a>
              </div>
            </el-col>

            <el-col :span="6" :offset="1">
              <el-upload
                class="upload-demo" :disabled="!this.isInEdit || this.mluploadDisable"
                :action="this.baseUrl + '?method=upload'"
                :show-file-list="false" :on-progress="mlFileProcess" :on-error="mlFileUploadFailed"
                :file-list="mlfileList" :on-success="mlFileUploadSuccess">
                <el-button size="small" type="primary"  icon="upload"
                  :disabled="!this.isInEdit || this.mluploadDisable">点击上传</el-button>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" style="text-align:left; padding-left:5px;">
              <el-date-picker v-model="mlDate" type="date" placeholder="选择日期"
              :disabled="!this.isInEdit"  size="small">
              </el-date-picker>
            </el-col>
            <el-col :span="6" :offset="1" style="line-height: 28px;" class="fontColumnTitle">
              （有效期）
            </el-col>
          </el-row>
      </el-col>
      <el-col :span="4" :offset="1" class="fontColumnTitle">
        <div class="divFileTitle">
          Business License for Medical Device class Ⅱ<br />
          第二类医疗器械经营备案凭证（复印件加盖公章）
        </div>
      </el-col>
      <el-col :span="7">
          <el-row  class="middleRow">
            <el-col :span="16" style="text-align:left; padding-left:5px;">
              <!-- <div class="fontColumnTitle fileurl" v-if="this.blfile.url == ''">
                {{this.blfile.name}} <span class="fileStatus">{{this.blfile.status}}</span>
              </div> -->
              <div class="fontColumnTitle" >
                <a :href="this.blfmdfile.url" target="_blank" download>
                  <span style="word-break: break-all">{{this.blfmdfile.name}}</span></a>
              </div>
            </el-col>

            <el-col :span="6" :offset="1">
              <el-upload
                class="upload-demo" :disabled="!this.isInEdit || this.blfmduploadDisable"
                :action="this.baseUrl + '?method=upload'"
                :show-file-list="false" :on-progress="blfmdFileProcess" :on-error="blfmdFileUploadFailed"
                :file-list="blfmdfileList" :on-success="blfmdFileUploadSuccess">
                <el-button size="small" type="primary"  icon="upload"
                  :disabled="!this.isInEdit || this.blfmduploadDisable">点击上传</el-button>
              </el-upload>
            </el-col>
          </el-row>

      </el-col>
    </el-row>
    <el-row :gutter="5">
      <el-col :span="22" :offset="1" class="buttonLine">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'IECompany',
    props: ['initData','baseUrl','isInEdit', 'itemKey', 'serviceUrl'],
    data() {
      return {
        errorMessage : "",
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
        ocfile: this.initData.ocfile,
        // ocfile: {
        //   name: '等待上传',
        //   url: '',
        //   status: '',
        //   fileId: ''
        // }
        mlDate: this.initData.mlDate,//null,
        mluploadDisable: false,
        mlfileList: [],
        mlfile: this.initData.mlfile,

        blfmdDate: this.initData.blfmdDate,//null,
        blfmduploadDisable: false,
        blfmdfileList: [],
        blfmdfile: this.initData.blfmdfile
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
          this.blfile.name = "上传失败，请重新上传";
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

        blfmdFileProcess(event, file, fileList) {
          this.blfmdfile.name = file.name;
          this.blfmdfile.status = "上传中";
          this.blfmdfile.url = "";
          this.blfmdfile.fileId = 0;
          this.blfmduploadDisable = true;
        },
        blfmdFileUploadFailed(err, file, fileList) {
          this.blfmdfile.name = "上传失败，请重新上传";
          this.blfmdfile.status = "上传失败";
          this.blfmdfile.url = "";
          this.blfmdfile.fileId = 0;
          this.blfmduploadDisable = false;
        },
        blfmdFileUploadSuccess(response, file, fileList) {
          this.blfmdfile.name = file.name;
          this.blfmdfile.status = "";
          this.blfmduploadDisable = false;
          this.blfmdfile.fileId = response;
          this.blfmdfile.url = this.baseUrl + "?method=load&fileid=" +response;
        },

        mlFileProcess(event, file, fileList) {
          this.mlfile.name = file.name;
          this.mlfile.status = "上传中";
          this.mlfile.url = "";
          this.mlfile.fileId = 0;
          this.mluploadDisable = true;
        },
        mlFileUploadFailed(err, file, fileList) {
          this.mlfile.name = "上传失败，请重新上传";
          this.mlfile.status = "上传失败";
          this.mlfile.url = "";
          this.mlfile.fileId = 0;
          this.mluploadDisable = false;
        },
        mlFileUploadSuccess(response, file, fileList) {
          this.mlfile.name = file.name;
          this.mlfile.status = "";
          this.mluploadDisable = false;
          this.mlfile.fileId = response;
          this.mlfile.url = this.baseUrl + "?method=load&fileid=" +response;
        },
        trcFileProcess(event, file, fileList) {
          this.trcfile.name = file.name;
          this.trcfile.status = "上传中";
          this.trcfile.url = "";
          this.trcfile.fileId = 0;
          this.trcuploadDisable = true;
        },
        trcFileUploadFailed(err, file, fileList) {
          this.trcfile.name = "上传失败，请重新上传";
          this.trcfile.status = "上传失败";
          this.trcfile.url = "";
          this.trcfile.fileId = 0;
          this.trcuploadDisable = false;
        },
        trcFileUploadSuccess(response, file, fileList) {
          this.trcfile.name = file.name;
          this.trcfile.status = "";
          this.trcuploadDisable = false;
          this.trcfile.fileId = response;
          this.trcfile.url = this.baseUrl + "?method=load&fileid=" +response;
        },
        ocFileProcess(event, file, fileList) {
          this.ocfile.name = file.name;
          this.ocfile.status = "上传中";
          this.ocfile.url = "";
          this.ocfile.fileId = 0;
          this.ocuploadDisable = true;
        },
        ocFileUploadFailed(err, file, fileList) {
          this.ocfile.name = "上传失败，请重新上传";
          this.ocfile.status = "上传失败";
          this.ocfile.url = "";
          this.ocfile.fileId = 0;
          this.ocuploadDisable = false;
        },
        ocFileUploadSuccess(response, file, fileList) {
          this.ocfile.name = file.name;
          this.ocfile.status = "";
          this.ocuploadDisable = false;
          this.ocfile.fileId = response;
          this.ocfile.url = this.baseUrl + "?method=load&fileid=" +response;
        },
        onRemoveItem() {
          this.$emit('deleteIEItem', this.itemKey);
        },
        validateIECompanyData() {
          this.errorMessage = "";
          if(this.companyName == null || this.companyName.trim() == "") {
            this.errorMessage = "请填写公司名称！";
            return false;
          } else if(this.blfile.fileId == null || this.blfile.fileId == "0" || this.blfile.fileId == 0) {
            this.errorMessage = "请上传营业执照！";
            return false;
          } else if((this.isThreeInOne == null || this.isThreeInOne == false)
          && (this.trcfile.fileId == null || this.trcfile.fileId == "0" || this.trcfile.fileId == 0)) {
            this.errorMessage = "请上传税务登记！";
            return false;
          } else if((this.isThreeInOne == null || this.isThreeInOne == false)
          &&  (this.ocfile.fileId == null || this.ocfile.fileId == "0" || this.ocfile.fileId == 0)) {
            this.errorMessage = "请上传组织代码证！";
            return false;
          } else if(this.mlfile.fileId == null || this.mlfile.fileId == "0" || this.mlfile.fileId == 0) {
            this.errorMessage = "请上传医疗器械经营许可证！";
            return false;
          } else if(this.blfmdfile.fileId == null || this.blfmdfile.fileId == "0" || this.blfmdfile.fileId == 0) {
            this.errorMessage = "请上传第二类医疗器械经营备案！";
            return false;
          }
          return true;
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
        this.mlDate = newInitData.mlDate;
        this.mlfile = newInitData.mlfile;
        this.blfmdDate = newInitData.blfmdDate;
        this.blfmdfile = newInitData.blfmdfile;
        this.errorMessage = "";
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
  padding-top: 5px;
  padding-bottom: 5px;
}
.buttonLine
{
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: #428bca;
  height: 3px;
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

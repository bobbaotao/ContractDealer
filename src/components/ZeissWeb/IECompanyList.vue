<template>
  <div>
    <div v-for="item of ieCompanyData">
      <el-row :gutter="5" class="middleRow">
        <el-col :span="4" :offset="1" class="fontColumnTitle">
          IE Company名称
        </el-col>
        <el-col :span="4" class="fontColumnTitle">
          {{item.companyName}}
        </el-col>
      </el-row>
      <el-row :gutter="5" class="middleRow">
        <el-col :span="4" :offset="1" class="fontColumnTitle">
          IE Company证件
        </el-col>
        <el-col :span="2" class="fontColumnTitle">
          <el-checkbox v-model="item.isThreeInOne" :disabled="true">三证合一</el-checkbox>
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
                  <a :href="item.blfile.url" target="_blank" download><span style="word-break: break-all">{{item.blfile.name}}</span></a>
                </div>
              </el-col>

              <el-col :span="6" :offset="1">

              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16" style="text-align:left; padding-left:5px;">
                <el-date-picker v-model="item.blDate" type="date" placeholder="选择日期"
                :disabled="true"  size="small">
                </el-date-picker>
              </el-col>
              <el-col :span="6" :offset="1" style="line-height: 28px;" class="fontColumnTitle">
                （有效期）
              </el-col>
            </el-row>
        </el-col>

      </el-row>
      <el-row class="middleRow" v-if="!item.isThreeInOne">
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
                <a :href="item.trcfile.url" target="_blank"><span style="word-break: break-all">{{item.trcfile.name}}</span></a>
              </div>
            </el-col>
            <el-col :span="6" :offset="1">

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" style="text-align:left; padding-left:5px;">
              <el-date-picker v-model="item.trcDate" type="date" placeholder="选择日期"
              :disabled="true"  size="small">
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
                <a :href="item.ocfile.url" target="_blank"><span style="word-break: break-all">{{item.ocfile.name}}</span></a>
              </div>
            </el-col>
            <el-col :span="6" :offset="1">

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" style="text-align:left; padding-left:5px;">
              <el-date-picker v-model="item.ocDate" type="date" placeholder="选择日期"
                  :disabled="true"  size="small">
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
                  <a :href="item.mlfile.url" target="_blank" download>
                    <span style="word-break: break-all">{{item.mlfile.name}}</span></a>
                </div>
              </el-col>

              <el-col :span="6" :offset="1">

              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16" style="text-align:left; padding-left:5px;">
                <el-date-picker v-model="item.mlDate" type="date" placeholder="选择日期"
                :disabled="true"  size="small">
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
                  <a :href="item.blfmdfile.url" target="_blank" download>
                    <span style="word-break: break-all">{{item.blfmdfile.name}}</span></a>
                </div>
              </el-col>

              <el-col :span="6" :offset="1">

              </el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="middleRow">
        <el-col :span="22" :offset="1">
          <QualificationGroup ref="qGroup" :initQList="qualificationList"
                              :isInEdit="isInEdit" :IEData="item"
                              :initQData="item.Qualification_Code_List">
          </QualificationGroup>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="22" :offset="1" class="buttonLine">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import QualificationGroup from './QualificationGroup';
  var array = require('array');

  export default {
    name: 'IECompanyList',
    data() {
      return {
      }
    },
    components: { QualificationGroup },
    props: ['ieCompanyData','qualificationList', 'isInEdit'],
    methods: {
      loadSavedData: function() {
        var ieDataArr = new array();
        for (var item in this.$refs.qGroup) {
          var value = this.$refs.qGroup[item].loadSelectedQualification();
          ieDataArr.push(value);
          console.dir(value);
        }
        return ieDataArr.toArray();
      }
    }
  }
</script>

<style scoped="scoped">
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

<template>
  <div>
    <el-row>
      <el-col :span="6">
        《医疗器械经营许可证》涵盖的经营范围
      </el-col>
      <el-col :span="16" :offset="1">

        <el-row v-for="item in qData">
          <el-col>
            <el-row>
              <el-col>
                {{item.groupName}}
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-checkbox-group v-model="item.selectedQ">
                  <el-checkbox  :disabled="!isInEdit" v-for="citem in item.qualificationList"
                                :label="citem.qualification_ID" :key="citem.qualification_ID">
                                {{citem.qualification_name}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  var array = require('array');
  import defaultData from '../defaultData';

  export default {
    name: "QualificationGroup",
    data() {
      return {
        qData: null
      }
    },
    props: ['initQList', 'isInEdit', 'initQData', 'IEData'],
    created: function() {
      this.reSetQList();
    },
    methods: {
      reSetQList: function()
      {
          if(this.initQList != null && this.initQList.length > 0) {
            var qArray = new array();
            var qGroupArr = new array();
            var qSelectArr = new array();
            var qType = -1;
            for (var i = 0; i < this.initQList.length; i++) {
              var qItem = this.initQList[i];
              if(qItem.qualification_type != qType) {
                if(qType != -1)
                {
                  var item = {
                    groupName: "第" + qType + "类",
                    qualificationList: qGroupArr.toArray(),
                    selectedQ: qSelectArr.length > 0 ? qSelectArr.toArray(): []
                  };
                  qArray.push(item);
                }
                qGroupArr = new array();         //server will return items order by type, if qualification_type is new, then restart init group data
                qSelectArr = new array();
                qType = qItem.qualification_type;
              }

              qGroupArr.push(qItem);
              if(this.initQData)   //set selected Arr
              {
                if((this.initQData + ",").indexOf(qItem.qualification_ID.toString() + ",") > -1)
                {
                  qSelectArr.push(qItem.qualification_ID);
                }
              }
            }

            if(qType != -1)
            {
              var item = {
                groupName: "第" + qType + "类",
                qualificationList: qGroupArr.toArray(),
                selectedQ: qSelectArr.length > 0 ? qSelectArr.toArray(): []
              };
              qArray.push(item);
            }

            this.qData = qArray.toArray();
          }
      },
      loadSelectedQualification: function() {
        var qSelectStr= "";
        if(this.qData && this.qData.length > 0) {
          for (var i = 0; i < this.qData.length; i++) {
            var item = this.qData[i];
            if(item.selectedQ && item.selectedQ.length > 0)
            {
              for (var x = 0; x < item.selectedQ.length; x++) {
                qSelectStr = qSelectStr + item.selectedQ[x] + ",";
              }
            }
          }
        }
        var returnData = this.IEData;
        returnData.Qualification_Code_List = qSelectStr;
        return defaultData.formartToPostData(returnData);
      }
    }
  }
</script>

<style scoped="scoped">
</style>

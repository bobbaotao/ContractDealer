<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            申请合同经销商类别<br />
            Nature of Contract Dealer
          </el-col>
          <el-col :span="16" :offset="1" >
            <el-radio-group v-model="form.NatureOfContractDealer" size="small">
              <el-radio label="Probation" size="small">考察期 Probation</el-radio>
              <el-radio label="NonProbation" size="small">非考察期 Non-probation</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            合同经销商是否完整填写声明表/Has the Self-declaration Form be fully completed
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-checkbox v-model="form.IsCompleteSDForm" size="small">是/YES</el-checkbox>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            合同经销商名称 (全称) <br />Name of Contract Dealer (Full Name)
          </el-col>
          <el-col :span="16" :offset="1" >
            <el-row class="smallRow">
              <el-col :span="6">
                 中文/Chinese:
              </el-col>
              <el-col :span="12">
                 <el-input  v-model="form.DealerName_CN" placeholder="请填写中文全名" size="small"></el-input>
               </el-col>
             </el-row>
             <el-row class="smallRow">
               <el-col :span="6">
                  英文/English:
               </el-col>
               <el-col :span="12">
                <el-input  v-model="form.DealerName_EN" placeholder="Please Input English Name" size="small"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            经销商考察期间、考察目标、考察结果
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-row class="smallRow">
             <el-col>
               期间/Period <el-input v-model="form.Period"  type="textarea" :autosize="{ minRows: 2}"></el-input>
             </el-col>
           </el-row>
           <el-row class="smallRow">
             <el-col>
               目标/Performance Target<br />
               <el-input v-model="form.Performance_Target"  type="textarea" :autosize="{ minRows: 2}"></el-input>
             </el-col>
           </el-row>
           <el-row class="smallRow">
             <el-col>
               Assessment of Probation/考察结果评估：<br />
               <el-input v-model="form.Assessment_Probation"  type="textarea" :autosize="{ minRows: 2}"></el-input>
             </el-col>
           </el-row>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            授权期限、产品和地区/行业<br />Product Segment and Area
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-row class="smallRow">
             <el-col>
               授权期限/Authorization Period<br />
               <el-input v-model="form.Authorization_Period"  type="textarea" :autosize="{ minRows: 2}"></el-input>
             </el-col>
           </el-row>
           <el-row class="smallRow">
             <el-col>
               产品/Product<br />
               <el-input v-model="form.Product"  type="textarea" :autosize="{ minRows: 2}"></el-input>
             </el-col>
           </el-row>
           <el-row class="smallRow">
             <el-col>
               地区和/或行业 Area and/or Industry<br />
               <el-input v-model="form.Area_Industry"  type="textarea"  :autosize="{ minRows: 2}"></el-input>
             </el-col>
           </el-row>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            给合同经销商的报价/报酬<br />Quotation/Remuneration to Contract Dealer
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-input v-model="form.Dealer_QR"  type="textarea"  :autosize="{ minRows: 4}"></el-input>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            给合同经销商的报价/报酬<br />Quotation/Remuneration to Contract Dealer
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-input v-model="form.Dealer_QR"  type="textarea"  :autosize="{ minRows: 4}"></el-input>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            合同经销商的为蔡司提供的服务。<br />Please describe the activities the Contract Dealer is to carry for ZEISS
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-input v-model="form.Dealer_Activity"  type="textarea"  :autosize="{ minRows: 4}"></el-input>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            申请原因/Reason of Application
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-input v-model="form.ReasonOfApplication"  type="textarea"  :autosize="{ minRows: 4}"></el-input>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            是否考虑其它公司？如有，请列出其名称？<br /> Did you examine alternatives? If so, what are they?
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-input v-model="form.Dealer_EA"  type="textarea"  :autosize="{ minRows: 4}"></el-input>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            是否取得该合同经销商业务参考信息？如有，例如参考人姓名，单位及参考信息结果。<br />Did you obtain reference about the Spot Dealer? If yes, from whom and with what results?
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-input v-model="form.Dealer_OR"  type="textarea"  :autosize="{ minRows: 4}"></el-input>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            该合同经销商是否是由最终用户推荐？<br />Was the Contract Dealer recommended to you by a customer?
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-input v-model="form.Dealer_Re"  type="textarea"  :autosize="{ minRows: 3}"></el-input>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            该合同经销商是否与蔡司有业务关系？ 如有，请说明业务关系及时间。<br />Is or was the Contract Dealer in any business relationship with ZEISS? If so, in what role and when?
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-input v-model="form.Dealer_BR"  type="textarea"  :autosize="{ minRows: 4}"></el-input>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            据你所知，该合同经销商或其员工或管理人员是否与蔡司的员工或管理人员有亲属关系或私人朋友关系？<br />According to your knowledge, is the Contract Dealer or one of its employees or manager has relative relationship or persona friendship with ZEISS employees or managers?
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-input v-model="form.Dealer_EM_BR"  type="textarea" :autosize="{ minRows: 4}"></el-input>
          </el-col>
        </el-row>
        <el-row class="middleRow">
          <el-col :span="5" :offset="1" >
            你是否知道或有理由相信，该合同经销商有违法历史（尤其关于腐败贿赂、出口控制、洗钱、欺诈、反垄断违法行为）？<br />Do you know or have reasons to assume, that the Contract Dealer has a history of legal violations (especially corruption offense, bribery, export control violation, money laundering, fraud offenses or violation of completion law)?
          </el-col>
          <el-col :span="16" :offset="1" >
           <el-input v-model="form.Dealer_BL_History"  type="textarea" :autosize="{ minRows: 4}"></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="middleRow" v-if="IsAllowCurrentUserSubmit && (form.status != '3' || form.status != '4')">
      <el-col :span="5" :offset="7">
        <el-button  type="primary" size="small">
          Save
        </el-button>
      </el-col>
      <el-col :span="5">
        <el-button  type="primary" size="small">
          Submit
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: DealerApplication,
    data() {
      return {
        form: {
               Applicant: null,
               ApplicantAccount: null,
               Area_Industry: null,
               Assessment_Probation: null,
               Authorization_Period: null,
               BU: null,
               Created: "",
               CreatedBy: null,
               DealerName_CN: null,
               DealerName_EN: null,
               Dealer_Activity: null,
               Dealer_BL_History: null,
               Dealer_BR: null,
               Dealer_EA: null,
               Dealer_EM_BR: null,
               Dealer_Id: "",
               Dealer_OR: null,
               Dealer_QR: null,
               Dealer_Re: null,
               IsCompleteSDForm: false,
               Modified: "",
               ModifiedBy: null,
               NatureOfContractDealer: null,
               Performance_Target: null,
               Period: null,
               Product: null,
               ReasonOfApplication: null,
               Status: "1",
               id: ""
        }
      }
    },
    props:['initData','IsAllowCurrentUserSubmit'],
    Created: function() {
      this.form = this.initData;
    },
    methods: {
      ValidateSubmit: function() {
        if(this.form == null)
        {
          this.$message("Please input all infomation");
          return false;
        }
        if(this.form.DealerName_CN == null || this.form.DealerName_CN == '' ||
          this.form.DealerName_EN == null || this.form.DealerName_EN == '')
        {
          this.$message("Please input all dealer name");
          return false;
        }
        if(this.form.Period == null || this.form.Period == '' ||
            this.form.Performance_Target == null || this.form.Performance_Target == '' ||
            this.form.Assessment_Probation == null || this.form.Assessment_Probation == '' ||
            this.form.Authorization_Period == null || this.form.Authorization_Period == '' ||
            this.form.Product == null || this.form.Product == '' ||
            this.form.Area_Industry == null || this.form.Area_Industry == '' ||
            this.form.Dealer_QR == null || this.form.Dealer_QR == '' ||
            this.form.Dealer_Activity == null || this.form.Dealer_Activity == '' ||
            this.form.ReasonOfApplication == null || this.form.ReasonOfApplication == '' ||
            this.form.Dealer_EA == null || this.form.Dealer_EA == ''||
            this.form.Dealer_OR == null || this.form.Dealer_OR == '' ||
            this.form.Dealer_Re == null || this.form.Dealer_Re == '' ||
            this.form.Dealer_BR == null || this.form.Dealer_BR == '' ||
            this.form.Dealer_EM_BR == null || this.form.Dealer_EM_BR == ''||
            this.form.Dealer_BL_History == null || this.form.Dealer_BL_History == '')
        {
          this.$message("Please input all info");
          return false;
        }
        return true;
      },
      SaveData: function() {
        this.form.Status = "1";
        this.$emit("Submit", this.form);
      },
      SubmitData: function() {
        this.form.Status = "2";
        this.$emit("Submit", this.form);
      }
    }
  }
</script>

<style scoped=scoped>
.middleRow {
  padding-top: 20px;
  text-align: left;
  font-size: 12px;
}
.smallRow {
  padding-top: 8px;
  text-align: left;
}
</style>

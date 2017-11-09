<template>
  <div class="divDealerDetail">
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
            <span style="padding-left: 5px;">1. Company information / 公司概况</span>
          </el-col>
        </el-row>
        <el-row class="sectionTitle2">
          <el-col :span="24">
            <span style="padding-left: 5px;">1.1 Company Certificates/公司证照</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col class="colMainInfo" :span="24">
            <el-row class="commonRow">
              <el-col :span="24">
                <el-checkbox v-model="dealerInfoData.IsMerge" :disabled="true">三证合一</el-checkbox>
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                Business license (copy)<br />
                营业执照（复印件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.business_license_name">
                  <a target="blank" class="zeisslink"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=business_license'"
                    download>
                    {{dealerInfoDocData.business_license_name}}
                  </a><br />
                  (有效期至{{dealerInfoDocData.licensedate == "0001-01-01" ? "2999-01-01" : dealerInfoDocData.licensedate}})
                </div>
                <span v-else>暂未上传</span>
              </el-col>
              <el-col :span="5" :offset="1">
                ID card of legal representative (copy)<br />
                法人代表身份证（复印件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.representative_ID_name">
                  <a target="blank"  class="zeisslink"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=representative_ID'"
                    download>
                    {{dealerInfoDocData.representative_ID_name}}
                  </a>
                </div>
                <span v-else>暂未上传</span>
              </el-col>
            </el-row>

            <el-row  class="commonRow" v-if="!dealerInfoData.IsMerge">
              <el-col :span="5">
                Organization code certificate (copy)<br />
                组织代码证（复印件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.org_code_cert_name">
                  <a target="blank"  class="zeisslink"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=org_code_cert'"
                    download>
                    {{dealerInfoDocData.org_code_cert_name}}
                  </a><br />
                  (有效期至{{dealerInfoDocData.certificatedate == "0001-01-01" ? "2999-01-01" : dealerInfoDocData.certificatedate}})
                </div>
                <span v-else>暂未上传</span>
              </el-col>
              <el-col :span="5" :offset="1">
                Tax registration certificate (copy)<br />
                税务登记证（复印件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.tax_registration_cert_name">
                  <a target="blank"  class="zeisslink"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=tax_registration_cert'"
                    download>
                    {{dealerInfoDocData.tax_registration_cert_name}}
                  </a><br />
                  (有效期至{{dealerInfoDocData.registrationdate == "0001-01-01" ? "2999-01-01" : dealerInfoDocData.registrationdate}})
                </div>
                <span v-else>暂未上传</span>
              </el-col>
            </el-row>

            <el-row  class="commonRow">
              <el-col :span="5">
                Certificate of incorporation (hardcopy)<br />
                公司章程（复印件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.incorporation_Certificate_name">
                  <a target="blank"  class="zeisslink"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=incorporation_Certificate'"
                    download>
                    {{dealerInfoDocData.incorporation_Certificate_name}}
                  </a>
                </div>
                <span v-else>暂未上传</span>
              </el-col>
              <el-col :span="5" :offset="1">
                Audit report (hardcopy)<br />
                有效的最新年度审计报告（复印件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.Audit_report_name">
                  <a target="blank"  class="zeisslink"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=Audit_report'"
                    download>
                    {{dealerInfoDocData.Audit_report_name}}
                  </a>
                </div>
                <span v-else>暂未上传</span>
              </el-col>
            </el-row>

            <el-row  class="commonRow">
              <el-col :span="5">
                Organization chart (original)<br />
                组织架构图（原件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.Organization_chart_name">
                  <a target="blank"  class="zeisslink"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=Organization_chart'"
                    download>
                    {{dealerInfoDocData.Organization_chart_name}}
                  </a>
                </div>
                <span v-else>暂未上传</span>
              </el-col>

            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                Medical Device Operation License<br />
                医疗器械经营许可证
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.med_device_license_name">
                  <a target="blank"  class="zeisslink"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=med_device_license'"
                    download>
                    {{dealerInfoDocData.med_device_license_name}}
                  </a><br />
                  (有效期至{{dealerInfoDocData.Medicaldate == "0001-01-01" ? "2999-01-01" : dealerInfoDocData.Medicaldate}})
                </div>
                <span v-else>暂未上传</span>
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                Medical Device Operation License class II<br />
                第二类医疗器械经营备案凭证
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.med_device_license_name2">
                  <a target="blank"  class="zeisslink"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=med_device_license2'"
                    download>
                    {{dealerInfoDocData.med_device_license_name2}}
                  </a>
                </div>
                <span v-else>暂未上传</span>
              </el-col>
              <el-col :span="5" :offset="1">
                《医疗器械经营许可证》涵盖的经营范围
              </el-col>
              <el-col :span="5" :offset="1">
                <span v-html="dealerInfoDocData.qualificationText"></span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="sectionTitle2">
          <el-col :span="24">
            <span style="padding-left: 5px;">1.2 Basic information / 基本信息</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col class="colMainInfo" :span="24">
            <el-row class="commonRow">
              <el-col :span="5">
                Full name of company<br />
                公司全名
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.fullcompanyname}}
              </el-col>
              <el-col :span="5" :offset="1">
                Former name of company<br />
                公司曾用名
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.formercompanyname}}
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                Legal form of company<br />
               (e.g. Limited, Corporation, etc.)<br />
              公司法律形式<br />
              (比如 有限公司，股份制公司，等)<br />
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.companylgalform}}
              </el-col>
              <el-col :span="5" :offset="1">
                Opening Bank Address<br />
                开户行地址
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.openingbankaddress}}
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                Fax number<br />
                传真
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.Faxnumber}}
              </el-col>
              <el-col :span="5" :offset="1">
                Website (if existing)<br />
                公司网站（如果有）
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.website}}
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                year of Establishment<br />
                公司成立年份
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.registered_year}}
              </el-col>
              <el-col :span="5" :offset="1">
                Phone number<br />
                单位电话
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.contact_phone}}
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                Opening Bank<br />
                开户银行
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.opening_bank}}
              </el-col>
              <el-col :span="5" :offset="1">
                Tax number<br />
                税号
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.tax_number}}
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                Account<br />
                账号
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.bank_account}}
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                Company Address<br />
                公司地址
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.company_address}}
              </el-col>
            </el-row>

          </el-col>
        </el-row>

        <el-row class="sectionTitle2">
          <el-col :span="24">
            <span style="padding-left: 5px;">1.3 Business infrastructure / 企业基本信息</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col class="colMainInfo" :span="24">
            <el-row class="commonRow">
              <el-col :span="5">
                Products and brands disributed/pressented <br />
                经营的产品及品牌
              </el-col>
              <el-col :span="17" :offset="1">
                {{dealerInfoData.products}}
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="5">
                Business introduction<br />
                企业业务简介
              </el-col>
              <el-col :span="17" :offset="1">
                {{dealerInfoData.Businessintroduction}}
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                Actual and planned number of sales dedicated to CZ products <br />
                负责蔡司产品的销售员的数量（现况和计划)
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.salesnumber}}
              </el-col>
              <el-col :span="5" :offset="1">
                Office (area / own OR leased)<br />
                办公室（面积/自有或租赁）
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.Office}}
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="5">
                Number of employees<br />
                员工数量
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.employee_number}}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
          <el-row class="sectionTitle">
            <el-col :span="24">
                <span style="padding-left: 5px;">2. Financial Information/财务信息</span>
            </el-col>
          </el-row>
          <el-row class="sectionDetail">
            <el-col class="colMainInfo" :span="24">
              <el-row class="commonRow">
                <el-col :span="5">
                  Registered capital<br />
                  注册资金
                </el-col>
                <el-col :span="17" :offset="1">
                  {{dealerInfoData.registered_capital}}
                </el-col>
              </el-row>
              <el-row class="commonRow">
                <el-col :span="24">
                  Equity structure (Shareholder structure. If a shareholder is a company (except SOE or public company), shareholder information shall be provided until individual shareholder level )<br />
                  股权结构（股东及持股比例。股东是公司（除国有或上市公司外）的，需提供股东信息至自然人）
                </el-col>
              </el-row>
              <el-row class="commonRow">
                <el-col :span="4">
                  Name<br />
                  股东名称
                </el-col>
                <el-col :span="4">
                  Shareholder% <br />
                  持股比例%
                </el-col>
                <el-col :span="4">
                  Date of Birth<br />
                  出生日期
                </el-col>
                <el-col :span="4">
                  Nationality<br />
                  国籍
                </el-col>
                <el-col :span="4">
                  Address<br />
                  地址
                </el-col>
                <el-col :span="4">
                  ID/Passport #<br />
                  身份证/护照号码
                </el-col>
              </el-row>

              <el-row class="commonRow">
                <el-col :span="4">
                  {{dealerInfoData.shareholder1}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.equity_ratio1}}
                </el-col>
                <el-col :span="4">
                  {{GetDate(dealerInfoData.Shareholder_birth1)}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_Nationality1}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_Address1}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_ID1}}
                </el-col>
              </el-row>

              <el-row class="commonRow" v-if="dealerInfoData.shareholder2 && dealerInfoData.shareholder2 != ''">
                <el-col :span="4">
                  {{dealerInfoData.shareholder2}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.equity_ratio2}}
                </el-col>
                <el-col :span="4">
                  {{GetDate(dealerInfoData.Shareholder_birth2)}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_Nationality2}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_Address2}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_ID2}}
                </el-col>
              </el-row>

              <el-row class="commonRow" v-if="dealerInfoData.shareholder3 && dealerInfoData.shareholder3 != ''">
                <el-col :span="4">
                  {{dealerInfoData.shareholder3}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.equity_ratio3}}
                </el-col>
                <el-col :span="4">
                  {{GetDate(dealerInfoData.Shareholder_birth3)}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_Nationality3}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_Address3}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_ID3}}
                </el-col>
              </el-row>

              <el-row class="commonRow"  v-if="dealerInfoData.shareholder5 && dealerInfoData.shareholder5 != ''">
                <el-col :span="4">
                  {{dealerInfoData.shareholder5}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.equity_ratio5}}
                </el-col>
                <el-col :span="4">
                  {{GetDate(dealerInfoData.Shareholder_birth5)}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_Nationality5}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_Address5}}
                </el-col>
                <el-col :span="4">
                  {{dealerInfoData.Shareholder_ID5}}
                </el-col>
              </el-row>


              <el-row class="commonRow" v-if="dealerInfoData.shareholder6 && dealerInfoData.shareholder6 != ''">
                    <el-col :span="4">
                            {{dealerInfoData.shareholder6}}
                    </el-col>
                    <el-col :span="4">
                            {{dealerInfoData.equity_ratio6}}
                    </el-col>
                    <el-col :span="4">
                            {{GetDate(dealerInfoData.Shareholder_birth6)}}
                    </el-col>
                    <el-col :span="4">
                            {{dealerInfoData.Shareholder_Nationality6}}
                    </el-col>
                    <el-col :span="4">
                            {{dealerInfoData.Shareholder_Address6}}
                    </el-col>
                    <el-col :span="4">
                            {{dealerInfoData.Shareholder_ID6}}
                    </el-col>
                </el-row>

              <el-row class="commonRow">
                <el-col :span="24">
                  <span style="font-weight: bold;">Actual Controller/实际控制人</span> <br />
                  If the Company is not actually controlled by the shareholder(s). Please list the Actual Controller. Actual Controller refers to a person who is not a shareholder of the company, but is able to control the company’s operation in practice through investment relationship, agreement or other arrangement.<br />
                  如果公司实际不是由股东控制的，请列名公司实际控制人姓名等相关信息。实际控制人，是指虽不是公司的股东，但通过投资关系、协议或者其他安排，能够实际支配公司行为的人。 <br />
                  <el-checkbox v-model="dealerInfoData.notfit" :disabled="true">不适用</el-checkbox>
                </el-col>
              </el-row>

              <el-row class="commonRow">
                <el-col :span="5">
                  姓名<br />
                  name<br />
                  {{dealerInfoData.shareholder4}}
                </el-col>
                <el-col :span="5">
                  Date of Birth<br />
                  出生日期<br />
                  {{GetDate(dealerInfoData.Shareholder_birth4)}}
                </el-col>
                <el-col :span="4">
                  Nationality<br />
                  国籍<br />
                  {{dealerInfoData.Shareholder_Nationality4}}
                </el-col>
                <el-col :span="5">
                  护照/身份证号码<br />
                  Passport/ID Number<br />
                  {{dealerInfoData.Shareholder_ID4}}
                </el-col>
                <el-col :span="5">
                  地址<br />
                  Address<br />
                  {{dealerInfoData.Shareholder_Address4}}
                </el-col>
              </el-row>

              <el-row class="commonRow">
                <el-col :span="24">
                  <el-row>
                    <el-col :span="24">
                      Sales Revenue in last 3 fiscal years/过去三年营业额<br />

                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      Business situation during the last fiscal years<br />
                       过去三个财年的业务现况
                    </el-col>
                    <el-col :span="6">
                      {{dealerInfoData.fy1}}
                    </el-col>
                    <el-col :span="6">
                      {{dealerInfoData.fy2}}
                    </el-col>
                    <el-col :span="6">
                      {{dealerInfoData.fy3}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      Total Sales revenue<br />
                      年营业额
                    </el-col>
                    <el-col :span="6">
                      {{dealerInfoData.sales_revenue1}}
                    </el-col>
                    <el-col :span="6">
                      {{dealerInfoData.sales_revenue2}}
                    </el-col>
                    <el-col :span="6">
                      {{dealerInfoData.sales_revenue3}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      Sales revenue of CZ products<br />
                      蔡司产品营业额
                    </el-col>
                    <el-col :span="6">
                      {{dealerInfoData.Czrevenue1}}
                    </el-col>
                    <el-col :span="6">
                      {{dealerInfoData.Czrevenue2}}
                    </el-col>
                    <el-col :span="6">
                      {{dealerInfoData.Czrevenue3}}
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

            </el-col>
          </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
              <span style="padding-left: 5px;">3. Management Information / 管理人员信息</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col class="colMainInfo" :span="24">
            <el-row class="commonRow">
              <el-col :span="3">
                &nbsp;
              </el-col>
              <el-col :span="3">
                Name<br />
                姓名
              </el-col>
              <el-col :span="6">
                Phone number<br />
                电话号码
              </el-col>
              <el-col :span="6">
                Mobile phone number<br />
                手机号码
              </el-col>
              <el-col :span="6">
                Email address<br />
                邮件地址
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="3">
                总经理
              </el-col>
              <el-col :span="3">
                {{dealerInfoData.Manager_name}}
              </el-col>
              <el-col :span="6">
                  {{dealerInfoData.Manager_phone}}
              </el-col>
              <el-col :span="6">
                  {{dealerInfoData.Manager_mobile}}
              </el-col>
              <el-col :span="6">
                  {{dealerInfoData.Manager_email}}
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="3">
                财务负责人
              </el-col>
              <el-col :span="3">
                {{dealerInfoData.finance_name}}
              </el-col>
              <el-col :span="6">
                  {{dealerInfoData.finance_phone}}
              </el-col>
              <el-col :span="6">
                  {{dealerInfoData.financer_mobile}}
              </el-col>
              <el-col :span="6">
                  {{dealerInfoData.finance_email}}
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="3">
                业务负责人
              </el-col>
              <el-col :span="3">
                {{dealerInfoData.owner_name}}
              </el-col>
              <el-col :span="6">
                  {{dealerInfoData.owner_phone}}
              </el-col>
              <el-col :span="6">
                  {{dealerInfoData.owner_mobile}}
              </el-col>
              <el-col :span="6">
                  {{dealerInfoData.owner_email}}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
              <span style="padding-left: 5px;">4. Relevant Experience / 相关业务经验</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col class="colMainInfo" :span="24">
            <el-row class="commonRow">
              <el-col :span="5">
                Customer<br />
                客户名称
              </el-col>
              <el-col :span="5" :offset="1">
                Product and/or Service<br />
                产品和服务
              </el-col>
              <el-col :span="5" :offset="1">
                Sales revenue<br />
                金额
              </el-col>
              <el-col :span="5" :offset="1">
                Customer references<br />
                (incl. contact person and contact data)<br />
                (包括联系人名称及联系方式)
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="5">
                {{dealerInfoData.customer1}}
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.product_service1}}
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.customer_revenue1}}
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.customer_references1}}
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="5">
                {{dealerInfoData.customer2}}
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.product_service2}}
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.customer_revenue2}}
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.customer_references2}}
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="5">
                {{dealerInfoData.customer3}}
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.product_service3}}
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.customer_revenue3}}
              </el-col>
              <el-col :span="5" :offset="1">
                {{dealerInfoData.customer_references3}}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
              <span style="padding-left: 5px;">5. Business activity with CZSH / 与蔡司上海的业务</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col class="colMainInfo" :span="24">
            <el-row class="commonRow">
              <el-col :span="1">
                (a)
              </el-col>
              <el-col :span="22">
                What type of services do you wish to supply to CZSH in the future?<br />
                将为蔡司上海提供什么服务？ <br />
                <div class="divTextArea">
                  {{dealerInfoData.czshservices}}
                </div>
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="1">
                (b)
              </el-col>
              <el-col :span="22">
                Have you had previous contractual relationships with CZSH? If yes, describe when, how long, what? <br />
                此前是否与蔡司上海存在业务关系？ 如有，请说明何时、多长期间和什么业务？  <br />
                <div class="divTextArea">
                  {{dealerInfoData.relationships}}
                </div>
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="1">
                (c)
              </el-col>
              <el-col :span="22">
                Are you planning to engage subcontractors in the context of your business relationship with CZSH? <br />
                If yes, please provide subcontractor’s name, address, date of establishment, legal representative. <br />
                在与蔡司上海的业务中是否会使用分包（销）商？ 如是，请提供分包（销）商的名称、地址、注册日期和法定代表人。 <br />
                <div class="divTextArea">
                  {{dealerInfoData.subcontractors}}
                </div>
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="1">
                (d)
              </el-col>
              <el-col :span="22">
                Do your company or any of your employees have in/direct financial connections or family relationships with customers involved in our proposed business relationship?<br />
                If yes, please provide details. <br />
                在与蔡司上海拟议的业务关系中，你公司或员工是否与客户存在直接或间接的财务或亲属关系？ 如有，请说明。<br />
                <div class="divTextArea">
                  {{dealerInfoData.financialorfamily}}
                </div>
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="1">
                (e)
              </el-col>
              <el-col :span="22">
                How did you come into contact with CZSH? (e.g. recommendation of a customer, an office-holder, a third party)?<br />
                If yes, please state the contact in question. <br />
                你公司是如何认识蔡司上海的（如：客户、政府官员或第三方的推荐）？如果是第三方推荐，请说明推荐人的联系方式。<br />
                <div class="divTextArea">
                  {{dealerInfoData.contact}}
                </div>
              </el-col>
            </el-row>

          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
              <span style="padding-left: 5px;">6. Compliance Questions/ 合规问题</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col class="colMainInfo" :span="24">
            <el-row class="commonRow">
              <el-col :span="1">
                (a)
              </el-col>
              <el-col :span="22">
                Are you or an employee of your company an office-holder or employed in a public authority, or has this been the case in the past five years? If yes, please explain in detail:<br />
                你本人或公司员工是否在政府部门担任职务或被其聘用，或在过去的5年时间里有这样的情况？如有，请说明。 <br />
                <div class="divTextArea">
                  {{dealerInfoData.publicauthority}}
                </div>
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="1">
                (b)
              </el-col>
              <el-col :span="22">
                Do direct or indirect family relationships exist between you or employees of your company with office-holders who are politically active in our approached field of business? If yes, please explain in detail.<br />
                你本人或公司员工与主管你所从事业务的官员存在直接或间接的亲属关系？如是，请说明。  <br />
                <div class="divTextArea">
                  {{dealerInfoData.holdersrelationships}}
                </div>
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="1">
                (c)
              </el-col>
              <el-col :span="22">
                Does your company have a Compliance Management System, particularly guidelines on anti-corruption/bribery and preventive instruments? If yes, please explain in detail. <br />
                你公司是否有合规管理体系，尤其是反腐败/贿赂指南及预防措施？ 如有，请说明。<br />
                <div class="divTextArea">
                  {{dealerInfoData.compliancemanagement}}
                </div>
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="1">
                (d)
              </el-col>
              <el-col :span="22">
                Please state if within the last five years an investigation on financial crimes was initiated relating to you, your company's directors (management) or shareholders. (e.g. money laundering, violations of competition and antitrust law, corruption and bribery) If yes,  please explain in detail.<br />
                请说明在前五年是否有对你本人、公司董事（管理人员）或股东涉及经济犯罪的调查 （如洗钱、违反竞争和垄断法，腐败和商业贿赂）。如有，请说明。 <br />
                <div class="divTextArea">
                  {{dealerInfoData.investigation}}
                </div>
              </el-col>
            </el-row>

            <el-row class="commonRow">
              <el-col :span="1">
                (e)
              </el-col>
              <el-col :span="22">
                Are in/direct payments or donations to office-holders, political or charitable institutions being demanded/expected of or provided by you or your company in connection with your business activity? <br />
                在你司业务活动中，你或你公司是否被政府官员、政治团体或慈善组织要求/期待或向后者提供直接/间接金钱给付或捐赠？ <br />
                <div class="divTextArea">
                  {{dealerInfoData.donations}}
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
              <span style="padding-left: 5px;">7. Declaration of Protection of Personal Data / / 个人数据保护声明</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col class="colMainInfo" :span="24">
            <p style="padding-left:10px">In providing personal data (“Data”) in this questionnaire, we hereby warranty that</p>
            <p style="padding-left:20px">(1) all the Data have been collected legally;</p>
            <p style="padding-left:20px">(2) consents have been duly obtained from the owners of Data for the provision and use authorization of the Data as set out below:</p>
            <p style="padding-left:30px">(i) grant CZSH and its affiliates (hereinafter collectively or individually referred to as “ZEISS”), whether located within or outside of China, the right to collect, keep, process, transfer, store and use the Data;</p>
            <p style="padding-left:30px">(ii) the foregoing provision and authorization is only for the purpose of assessing the establishment, maintenance and termination of business relationship between ZEISS and us (“Purpose”). We further fully understand and agree, provided that ZEISS keeps the Data confidential and comply with applicable laws and regulations, ZEISS may, for the Purpose, use and store the Data at third party’s database (whether located within or outside of China) for due diligence check. We are the only party who takes the responsibility to respond to any infringement dispute or claim for damage compensation caused by untrue or defective warranties made by us and hold ZEISS harmless therefrom.</p>
            <p style="padding-left:10px">在提供本声明表中的个人信息（“数据”）时，我们在此承诺</p>
            <p style="padding-left:20px">（1）数据均以合法途径收集；</p>
            <p style="padding-left:20px">（2）数据的下述提供及许可使用已经适当取得数据所有人的同意：</p>
            <p style="padding-left:30px">（i）授予蔡司上海及其关联公司蔡司（以下合称或分别称之为“蔡司”），无论是位于中国境内或境外，收集、持有、处理、传递、保存和使用数据的许可；</p>
            <p style="padding-left:30px">（ii）前述提供和授权限用于蔡司与我们业务关系的建立、维持、终止的评估目的（“目的”）。且我们完全理解并同意，在对数据保密且遵守适用的法律法规的情况下，为实现前述目的，蔡司可在第三方数据库平台（无论是位于中国境内或境外）上使用，存储个人信息进行合规尽职调查。就任何因前述承诺不实或瑕疵引起的侵权纠纷或损害赔偿，我们应独立应对且使蔡司免受损失.</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
              <span style="padding-left: 5px;">8. Basic conditions of Business Relationship /业务关系基本条件</span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col class="colMainInfo" :span="24">
            <el-row class="commonRow">
              <el-col :span="1">
                (a)
              </el-col>
              <el-col :span="22">
                Our company has reported and will report to CZSH during our business relationship with CZSH any administrative or judicial investigation and Major Dispute. “Major Dispute”refers to a dispute in which the amount involved exceeds RMB 200,000 or the equivalent.<br />
                我们已经并将在与蔡司上海的业务关系存续期间向蔡司上海报告我们所涉及的行政或司法调查及重大法律纠纷。重大法律纠纷是指争议标的金额超过人民币20万(或等值)的 法律纠纷 。<br />
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="1">
                (b)
              </el-col>
              <el-col :span="22">
                No employee of CZSH or any of his/her relatives holds any share or position of our company nor has any other interest in our company. <br />
                我们没有违反中国商业贿赂法律法规的行为，也没有因此受到任何处罚。我们承诺遵守中国法律法规，包括但不限于反贿赂和反垄断法律法规。 <br />
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="1">
                (c)
              </el-col>
              <el-col :span="22">
                Our company, the shareholder, the beneficial controlling person, director, supervisor or employee of our Company is not the shareholder or employee (including part-time work) of any competitor of CZSH. “Competitor” refers to a legal entity which manufacturers, distributes or supplies products or services competing with products or services of CZSH. <br />
                我公司、我公司股东、实际控制人、董事、监事及员工不是蔡司上海竞争对手的股东或员工（包括兼职）。“ 竞争对手”是指生产、销售或供应与蔡司上海的产品或服务存在竞争关系的经济实体。 <br />

              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="1">
                (d)
              </el-col>
              <el-col :span="22">
                Our company has not committed any acts in violation of anti-bribery regulation or regulation regarding supervision of medical device of the PRC nor has been punished therefor. <br />
                我们没有违反中国商业贿赂法律法规或中国医疗器械监管(如适用)相关的行为，也没有因此受到任何处罚。<br />
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="1">
                (e)
              </el-col>
              <el-col :span="22">
                We shall ensure our staff to strictly comply with the PRC laws and regulations, and ZEISS Anti-Bribery and Corruption Commitment. We shall take proper measures including giving trainings to employees to ensure our performance of the aforementioned compliance commitment. <br />
                我们保证我们的工作人员严格遵守中国法律法规和蔡司反贿赂腐败承诺。我们应采取合适的措施包括对人员进行培训以确保其履行我们前述合规承诺。<br />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
      <el-col :span="24">
        <el-row class="sectionTitle">
          <el-col :span="24">
              <span style="padding-left: 5px;">9. Representations and Warranties/ 陈述和保证 </span>
          </el-col>
        </el-row>
        <el-row class="sectionDetail">
          <el-col class="colMainInfo" :span="24">
            <el-row class="commonRow">
              <el-col :span="1">
                (a)
              </el-col>
              <el-col :span="22">
                For applying the authorized dealer status of Carl Zeiss (Shanghai) Co., Ltd, („CZSH“) we hereby provide the above information and accompanied materials to CZSH and its affiliates for its review and assessment. <br />
                为向申请授予授权经销商的资格，本公司向蔡司上海及其关联公司提供上述信息及所附资料以供其审核评估。 <br />
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="1">
                (b)
              </el-col>
              <el-col :span="22">
                All information provided by us hereunder is true and valid to our best knowledge. We agree to assume liabilities for wrong information provided out of gross negligent or with intent, which shall entitle CZSH to terminate the contract with us immediately and pursue our liabilities. <br />
                本公司保证所提供的信息据我们所知均是真实有效的，并愿意承担因本公司故意或重大过失所造成的不实信息的全部责任，并且蔡司上海有权因此立即解除合同并追究我们的责任。  <br />
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="1">
                (c)
              </el-col>
              <el-col :span="22">
                I agree that all information provided herein can be stored, maintained and used by CZSH and its affiliates for business purpose. <br />
                本公司同意蔡司上海及其关联公司为业务目的保存和使用这些信息。<br />
              </el-col>
            </el-row>
            <el-row class="commonRow">
              <el-col :span="1">
                (d)
              </el-col>
              <el-col :span="22">
                I agree to allow ZEISS to verify your statements with a background check, where necessary. <br />
                本公司同意蔡司在必要时，就上述声明进行核实。 <br />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="LargeRow">
      <el-col :span="6">
        Date<br />
        日期
      </el-col>
      <el-col :span="4">
        {{GetDate(dealerInfoData.application_date)}}
      </el-col>
      <el-col :span="5">
        Full name of legal representative of<br />
        法定代表人全名
      </el-col>
      <el-col :span="5">
        {{dealerInfoData.representative}}
      </el-col>
    </el-row>
    <el-row class="LargeRow">
      <el-col :span="6">
        Upload signed Dealer Self Declaration Form<br />
        上传签名盖章后的经销商自我声明表
      </el-col>
      <el-col :span="12">
        <div  v-if="dealerInfoDocData.dealerinfo_name">
          <a target="blank"  class="zeisslink"
            :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=dealerinfo'"
            download>
            {{dealerInfoDocData.dealerinfo_name}}
          </a>
        </div>
        <span v-else>暂未上传</span>
      </el-col>
    </el-row>
    <el-row class="LargeRow">
      <el-col :span="6">
        Anti-Corrupt Document<br />
        反腐败声明
      </el-col>
      <el-col :span="12">
        <div  v-if="dealerInfoDocData.anti_bribery_name">
          <a target="blank"  class="zeisslink"
            :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=anti_bribery'"
            download>
            {{dealerInfoDocData.anti_bribery_name}}
          </a>
        </div>
        <span v-else>暂未上传</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import defaultData from '../defaultData';
  var moment = require('moment');
  export default {
    name: "",
    data() {
      return {
        fileBaseUrl: defaultData.zeissFileBaseUrl
      }
    },
    props: ['dealerInfoData', 'dealerInfoDocData'],
    methods: {
      GetDate: function(value) {
        if(value) {
          if(moment(value).isValid()) {
            return moment(value).format(defaultData.dateFormat);
          }
        }
        return "";
      }
    }
  }
</script>

<style scoped="scoped">
.divDealerDetail
{
  text-align: left;
}
.infoSection {
  border: 1px solid gray;
  text-align: left;
}
.sectionTitle {
  background-color: rgba(107, 145, 188);
  color: rgba(254, 254, 254);
  font-size: 20px;
  line-height: 30px;
  text-align: left;
}
.commonRow {
  padding-top: 5px;
  padding-bottom: 5px;
}
.sectionTitle2 {
  background-color: rgba(202, 219, 236);
  color: rgba(107, 145, 188);
  font-size: 16px;
  line-height: 24px;
  padding: 3px;
  text-align: left;
}
.sectionDetail
{
  font-size: 12px;
  line-height: 18px;
  padding: 3px;
  background: rgba(254, 254, 254);
  color: black;
  text-align: left;
}
.colMainInfo {
  padding-left: 5px;
}
.divTextArea
{ border: 1px solid black;
  width:98%;
  min-height:80px;
  text-align: left;
}
.LargeRow
{
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  font-size: 16px;
  line-height: 24px;
}
.zeisslink {
  word-break: break-all;
}
</style>

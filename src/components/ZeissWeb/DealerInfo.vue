<template>
  <div>
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
          <el-col :span="24">
            <el-row>
              <el-col :span="24">
                <el-checkbox v-model="dealerInfoData.IsMerge" :disabled="true">三证合一</el-checkbox>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                Business license (copy)<br />
                营业执照（复印件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.business_license_name">
                  <a target="blank"
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
                  <a target="blank"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=representative_ID'"
                    download>
                    {{dealerInfoDocData.representative_ID_name}}
                  </a>
                </div>
                <span v-else>暂未上传</span>
              </el-col>
            </el-row>

            <el-row v-if="!dealerInfoData.IsMerge">
              <el-col :span="5">
                Organization code certificate (copy)<br />
                组织代码证（复印件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.org_code_cert_name">
                  <a target="blank"
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
                  <a target="blank"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=tax_registration_cert'"
                    download>
                    {{dealerInfoDocData.tax_registration_cert_name}}
                  </a><br />
                  (有效期至{{dealerInfoDocData.registrationdate == "0001-01-01" ? "2999-01-01" : dealerInfoDocData.registrationdate}})
                </div>
                <span v-else>暂未上传</span>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                Certificate of incorporation (hardcopy)<br />
                公司章程（复印件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.incorporation_Certificate_name">
                  <a target="blank"
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
                  <a target="blank"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=Audit_report'"
                    download>
                    {{dealerInfoDocData.Audit_report_name}}
                  </a>
                </div>
                <span v-else>暂未上传</span>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                Organization chart (original)<br />
                组织架构图（原件）
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.Organization_chart_name">
                  <a target="blank"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=Organization_chart'"
                    download>
                    {{dealerInfoDocData.Organization_chart_name}}
                  </a>
                </div>
                <span v-else>暂未上传</span>
              </el-col>

            </el-row>

            <el-row>
              <el-col :span="5">
                Medical Device Operation License<br />
                医疗器械经营许可证
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.med_device_license_name">
                  <a target="blank"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=med_device_license'"
                    download>
                    {{dealerInfoDocData.med_device_license_name}}
                  </a><br />
                  (有效期至{{dealerInfoDocData.Medicaldate == "0001-01-01" ? "2999-01-01" : dealerInfoDocData.Medicaldate}})
                </div>
                <span v-else>暂未上传</span>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                Medical Device Operation License class II<br />
                第二类医疗器械经营备案凭证
              </el-col>
              <el-col :span="5" :offset="1">
                <div  v-if="dealerInfoDocData.med_device_license_name2">
                  <a target="blank"
                    :href="fileBaseUrl + '?method=loadDealerDoc&dealerid=' + dealerInfoData.dealer_id + '&filetype=med_device_license2'"
                    download>
                    {{dealerInfoDocData.med_device_license_name2}}
                  </a>
                </div>
                <span v-else>暂未上传</span>
              </el-col>
            </el-row>

          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="infoSection">
    </el-row>
    <el-row class="infoSection">
    </el-row>
    <el-row class="infoSection">
    </el-row>
    <el-row class="infoSection">
    </el-row>
    <el-row class="infoSection">
    </el-row>
    <el-row class="infoSection">
    </el-row>
    <el-row class="infoSection">
    </el-row>
    <el-row class="infoSection">
    </el-row>
  </div>
</template>

<script>
  import defaultData from '../defaultData';

  export default {
    name: "",
    data() {
      return {
        fileBaseUrl: defaultData.zeissFileBaseUrl
      }
    },
    props: ['dealerInfoData', 'dealerInfoDocData'],
    methods: {

    }
  }
</script>

<style scoped="scoped">
.infoSection {
  border: 1px solid gray;
}
.sectionTitle {
  background-color: rgba(107, 145, 188);
  color: rgba(254, 254, 254);
  font-size: 20px;
  line-height: 30px;
}
.sectionTitle2 {
  background-color: rgba(202, 219, 236);
  color: rgba(107, 145, 188);
  font-size: 16px;
  line-height: 24px;
  padding: 3px;
}
.sectionDetail
{
  font-size: 12px;
  line-height: 18px;
  padding: 3px;
  background: rgba(254, 254, 254);
  color: black;
}
</style>

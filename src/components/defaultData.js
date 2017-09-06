module.exports = {
  fileBaseUrl: "http://10.22.83.55:8080/Service/FileUploadHandler.ashx",
  serviceUrl: "http://10.22.83.55:8080/Service/DealerHandler.ashx",
  newIECompany: function() {
    // get an new IECompany
    return {
      companyInfoId: 0,
      companyName: "",
      isThreeInOne: false,
      // business lience info.
      blDate: null,
      blfile: {
        name: '等待上传',
        url: '',
        status: '',
        fileId: 0
      },
      // Tax registration certificate
      trcDate: null,
      trcfile: {
        name: '等待上传',
        url: '',
        status: '',
        fileId: 0
      },
      //Organization certificate
      ocDate: null,
      ocfile: {
        name: '等待上传',
        url: '',
        status: '',
        fileId: 0
      }
    }
  },
  getIEItemFromData: function(data) {
    return {
      companyInfoId: data.companyInfoId,
      companyName: data.companyName,
      isThreeInOne: data.isThreeInOne,
      // business lience info.
      blDate: data.blDate,
      blfile: data.blfile,
      // Tax registration certificate
      trcDate: data.trcDate,
      trcfile: data.trcfile,
      //Organization certificate
      ocDate: data.ocDate,
      ocfile: data.ocfile
    }
  },
  formartToPostData: function(data) {
    return {
      Id: data.companyInfoId,
      DealerId: '',
      IECompanyName: data.companyName,
      IsInOne: data.isThreeInOne,
      BLDocID: data.blfile.fileId,
      BLExpireDate: data.blDate == null ? new Date(2999,12,31) :  data.blDate,
      BLDocTitle: data.blfile.name,
      TRCDocID: data.trcfile.fileId,
      TRCExpireDate: data.trcDate == null ? new Date(2999,12,31) :  data.trcDate,
      TRDocTitle: data.trcfile.name,
      OCDocID: data.ocfile.fileId,
      OCExpireDate: data.ocDate == null ? new Date(2999,12,31) :  data.ocDate,
      OCDocTitle: data.ocfile.name
    }
  },
  getIEItemFromServerData: function(data) {
    return {
      companyInfoId: data.Id,
      companyName: data.IECompanyName,
      isThreeInOne: data.IsInOne,
      // business lience info.
      blDate: data.BLExpireDate,
      blfile: {
        name: data.BLDocTitle,
        url: this.fileBaseUrl + "?method=load&fileid=" + data.BLDocID,
        status: '',
        fileId: data.BLDocID
      },
      // Tax registration certificate
      trcDate: data.TRCExpireDate,
      trcfile:{
        name: data.TRDocTitle,
        url: this.fileBaseUrl + "?method=load&fileid=" + data.TRCDocID,
        status: '',
        fileId: data.TRCDocID
      },
      //Organization certificate
      ocDate: data.OCExpireDate,
      ocfile: {
        name: data.OCDocTitle,
        url: this.fileBaseUrl + "?method=load&fileid=" + data.OCDocID,
        status: '',
        fileId: data.OCDocID
      }
    }
  }
}

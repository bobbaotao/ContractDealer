var moment = require('moment');

module.exports = {
  fileBaseUrl: "../FileUploadHandler.ashx",
  serviceUrl: "../DealerHandler.ashx",
  cdServiceUrl: "/_vti_bin/Zeiss.SpotDealer/DealerService.svc",
  zeissFileBaseUrl: "../FileHandler.ashx",
  dateFormat: "YYYY-MM-DD",
  newIECompany: function() {
    // get an new IECompany
    return {
      companyInfoId: 0,
      companyName: "",
      isThreeInOne: false,
      // business lience info.
      blDate: null,
      blfile: {
        name: '',
        url: '',
        status: '',
        fileId: 0
      },
      // Tax registration certificate
      trcDate: null,
      trcfile: {
        name: '',
        url: '',
        status: '',
        fileId: 0
      },
      //Organization certificate
      ocDate: null,
      ocfile: {
        name: '',
        url: '',
        status: '',
        fileId: 0
      },
      mlDate: null,
      mlfile: {
        name: '',
        url: '',
        status: '',
        fileId: 0
      },
      blfmdDate: null,
      blfmdfile: {
        name: '',
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
      ocfile: data.ocfile,
      //medical lience
      mlDate: data.mlDate,
      mlfile: data.mlfile,
      //business lience for medical device class 2
      blfmdDate: data.blfmdDate,
      blfmdfile: data.blfmdfile
    }
  },
  formartToPostData: function(data) {
    var blDate = "";
    var trcDate = "";
    var ocDate = "";
    var mlDate = "";
    var blfmdDate = "";
    if(data.blDate != null && data.blDate != new Date())
    {
      blDate = moment(data.blDate).format(this.dateFormat);
    }
    if(data.trcDate != null && data.trcDate != new Date())
    {
      trcDate = moment(data.trcDate).format(this.dateFormat);
    }
    if(data.ocDate != null && data.ocDate != new Date())
    {
      ocDate = moment(data.ocDate).format(this.dateFormat);
    }
    if(data.mlDate != null && data.mlDate != new Date())
    {
      mlDate = moment(data.mlDate).format(this.dateFormat);
    }
    if(data.blfmdDate != null && data.blfmdDate != new Date())
    {
      blfmdDate = moment(data.blfmdDate).format(this.dateFormat);
    }

    return {
      Id: data.companyInfoId,
      DealerId: '',
      IECompanyName: data.companyName,
      IsInOne: data.isThreeInOne,

      BLDocID: data.blfile.fileId,
      BLExpireDate: blDate,
      BLDocTitle: data.blfile.name,

      TRCDocID: data.trcfile.fileId,
      TRCExpireDate: trcDate,
      TRDocTitle: data.trcfile.name,

      OCDocID: data.ocfile.fileId,
      OCExpireDate: ocDate,
      OCDocTitle: data.ocfile.name,

      MLDocID: data.mlfile.fileId,
      MLExpireDate: mlDate,
      MLDocTitle: data.mlfile.name,

      BLFMDDocID: data.blfmdfile.fileId,
      BLFMDExpireDate: blfmdDate,
      BLFMDDocTitle: data.blfmdfile.name

    }
  },
  getIEItemFromServerData: function(data) {
    return {
      companyInfoId: data.Id,
      companyName: data.IECompanyName,
      isThreeInOne: data.IsInOne,
      // business lience info.
      blDate: data.BLExpireDate == "" ? null : moment(data.BLExpireDate, this.dateFormat).toDate(),
      blfile: {
        name: data.BLDocTitle,
        url: this.fileBaseUrl + "?method=load&fileid=" + data.BLDocID,
        status: '',
        fileId: data.BLDocID
      },
      // Tax registration certificate
      trcDate: data.TRCExpireDate == "" ? null : moment(data.TRCExpireDate, this.dateFormat).toDate(),
      trcfile:{
        name: data.TRDocTitle,
        url: this.fileBaseUrl + "?method=load&fileid=" + data.TRCDocID,
        status: '',
        fileId: data.TRCDocID
      },
      //Organization certificate
      ocDate: data.OCExpireDate == "" ? null : moment(data.OCExpireDate, this.dateFormat).toDate(),
      ocfile: {
        name: data.OCDocTitle,
        url: this.fileBaseUrl + "?method=load&fileid=" + data.OCDocID,
        status: '',
        fileId: data.OCDocID
      },
      //medical lience
      mlDate: data.MLExpireDate == "" ? null : moment(data.MLExpireDate, this.dateFormat).toDate(),
      mlfile: {
        name: data.MLDocTitle,
        url: this.fileBaseUrl + "?method=load&fileid=" + data.MLDocID,
        status: '',
        fileId: data.MLDocID
      },
      //medical lience
      blfmdDate: data.BLFMDExpireDate == "" ? null : moment(data.BLFMDExpireDate, this.dateFormat).toDate(),
      blfmdfile: {
        name: data.BLFMDDocTitle,
        url: this.fileBaseUrl + "?method=load&fileid=" + data.BLFMDDocID,
        status: '',
        fileId: data.BLFMDDocID
      }
    }
  }
}

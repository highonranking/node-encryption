import CryptoJS  from "crypto-js";
const partnerId = "aguHfIt46EsbBmU92adIG/+IfdU=";
const partnerKey = "NjE3NDZjMGM2ZWQ0MzdiOGI0ZWJlODk1OWJlYjcxYzY=";
const sign = CryptoJS.MD5(partnerId + partnerKey).toString();
console.log(sign)

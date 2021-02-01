import CryptoJS from 'crypto-js';


  //随机生成指定数量的16进制key
  export function generatekey(num) {
    let library = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    for (var i = 0; i < num; i++) {
      let randomPoz = Math.floor(Math.random() * library.length);
      key += library.substring(randomPoz, randomPoz + 1);
    }
    key =  CryptoJS.enc.Hex.parse(key);
    return key;
  }

  //加密
  export function encrypt(content, key){
    let sKey = CryptoJS.enc.Utf8.parse(key);
    let sContent = CryptoJS.enc.Utf8.parse(content);
    let encrypted = CryptoJS.AES.encrypt(sContent, sKey, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  }
  //解密
  export function decrypt(content, key){
    let sKey = CryptoJS.enc.Utf8.parse(key);
    let decrypt = CryptoJS.AES.decrypt(content, sKey, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }


import JsEncrypt from 'jsencrypt'


export default {
  //加密
  RSAEncrypt: (obj) => {
    let encrypt = new JsEncrypt({default_key_size: 1024});
    //KEY RSA公钥
    let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSOPAooT0Uj60gvdn5Im1hsKSPU5Qrmyq48JBTndinmlGD++ZUbImzSUKBaDdcep7X1dYM99/yApB1oplP7nlxyAyur7FBw8Qhdap3ceqzH+Nvq7hG6roi50l6SLxTYvCKeewpLIlWvuBUpHAXpP3k4nhEduZz/kKAuqO4IzJ6OwIDAQAB';
    encrypt.setPublicKey(publicKey);
    let data = encrypt.encrypt(obj.toString());
    return data;
  },

  //解密
  RSADecrypt: (obj) => {
    let decryp = new JsEncrypt();
    //KEY RSA私钥
    decryp.setPrivateKey(key);
    let data = decryp.decrypt(obj.toString());
    return data;
  }

};


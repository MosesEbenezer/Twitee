/* eslint-disable @typescript-eslint/no-var-requires */
const CryptoJS = require('crypto-js');

//The Function Below To Encrypt Text
export const encryptWithAES = (text: any, hashphrase: any) => {
  return CryptoJS.AES.encrypt(text, hashphrase).toString();
};

//The Function Below To Decrypt Text
export const decryptWithAES = (ciphertext: any, hashphrase: any) => {
  console.log('hash phrase', hashphrase);
  const hashed = `${hashphrase}`;

  const bytes = CryptoJS.AES.decrypt(ciphertext, hashphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  console.log('originalText', originalText);
  return originalText;
};

// const encryptText = encryptWithAES('YAZAN');
// //EncryptedText==>  //U2FsdGVkX19GgWeS66m0xxRUVxfpI60uVkWRedyU15I=

// const decryptText = decryptWithAES(encryptText);
// //decryptText==>  //YAZAN

// hash phrase 2i3ut54urhgnjvhtd666@@20fh! // 2i3ut54urhgnjvhtd666@@20fh! // 2i3ut54urhgnjvhtd666@@20fh!
// decryptedTTTTTTT JUMIA-st8888hdg-1500-2

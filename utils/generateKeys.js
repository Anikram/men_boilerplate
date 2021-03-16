const crypto = require('crypto');
const fs = require('fs');

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  fs.writeFileSync(`${__dirname}../keys/id_rsa_pub.pem`, keyPair.publicKey);
  fs.writeFileSync(`${__dirname}../keys/id_rsa_private.pem`, keyPair.privateKey);
  fs.writeFileSync(`${__dirname}../keys/id_rsa_pub1.pem`, keyPair.publicKey);
  fs.writeFileSync(`${__dirname}../keys/id_rsa_private1.pem`, keyPair.privateKey);
}

genKeyPair();

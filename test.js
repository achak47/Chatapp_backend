var key = 'real secret keys should be long and random';
var encryptor = require('simple-encryptor')(key);
var encrypted = encryptor.encrypt('Test message') ;
var decrypted = encryptor.decrypt(encrypted);
console.log(decrypted) ;

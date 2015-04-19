var fs = require('fs');
var path = require('path');

var passwordFile = path.resolve(__dirname, '.smtp-password.txt');
var sessionSecret = path.resolve(__dirname, '.session-secret.txt');

if(!fs.existsSync(passwordFile)){
    console.error('Please set the password of smtp server in file: config/.smtp-password.txt!');
    process.exit(1);
}
if(!fs.existsSync(sessionSecret)){
    console.error('Please set the session secret in file: config/.session-secret.txt!');
    process.exit(1);
}

var emailConfig = {
    sender      : 'smtp.facehub@gmail.com',
    password    : fs.readFileSync(passwordFile,'utf-8'),
    smtp        : 'smtp.gmail.com'
};

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        host        : 'http://facehub.net',

        email       : emailConfig,
        secret      : fs.readFileSync(sessionSecret,'utf-8')
    };
}else{
    module.exports = {
        host        : 'http://127.0.0.1:3000',

        email       : emailConfig,
        secret      : fs.readFileSync(sessionSecret,'utf-8')
    };
}

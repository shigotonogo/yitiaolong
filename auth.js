var passwordless = require('passwordless'),
    RedisStore = require('passwordless-redisstore-bcryptjs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    email = require('emailjs'),
    mustache = require('mustache'),
    fs = require('fs'),
    config = require('./config/app.config');

module.exports = function(app){
    var emailConfig = {
       host:     process.env.SMTP_SERVER || config.email.smtp, 
       port:     process.env.SMTP_PORT,
       ssl:      process.env.NODE_ENV === 'production'
    };

    if(process.env.NODE_ENV === 'production'){
        emailConfig.user = config.email.sender;
        emailConfig.password = config.email.password;
    }

    var smtpServer  = email.server.connect(emailConfig);

    var host = config.host;

    // Setup of Passwordless
    passwordless.init(new RedisStore(6379, '127.0.0.1'));
    passwordless.addDelivery(
        function(tokenToSend, uidToSend, recipient, callback) {
            var emailTemplate = mustache.render(fs.readFileSync('./views/pages/email/login.html','utf-8'), {
                host : host,
                token : tokenToSend,
                uid : encodeURIComponent(uidToSend)
            });

            smtpServer.send({
               text :    'Hello!\nYou can now access your account here: ' 
                    + host + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend), 
               from :    config.email.sender, 
               to :      recipient,
               subject : '欢迎加入Facehub',
               attachment : [
                {data: emailTemplate, alternative:true}
               ]
            }, function(err, message) { 
                if(err) {
                    console.log(err);
                }
                callback(err);
            });
        }
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    app.use(cookieParser());
    
    // make the login states persistent use redis
    var Redis = require('connect-redis')(expressSession);
    app.use(expressSession({
        store: new Redis(),
        secret: config.secret
    }));

    app.use(passwordless.sessionSupport());
    app.use(passwordless.acceptToken({ successRedirect: '/' }));

    app.use('/auth', require('./routes/authentication.js'));
};
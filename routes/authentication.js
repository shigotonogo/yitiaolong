var url = require('url');
var router = require('express').Router();

var passwordless = require('passwordless');
var config = require('../config/app.config');

router.get('/', function(req, res) {
    if (req.user) {
        var cookieOptions = {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30 //one month
        };

        //in local development environment, we should not set the cookie domain to localhost(chrome browser has issue with this).
        if (process.env.NODE_ENV === 'production') {
            //we want set cookie to the root domain so we can have a simple sso solution.
            cookieOptions.domain = url.parse(config.host).hostname;
        }

        res.cookie('uid', req.user, cookieOptions);

        res.redirect('/');
    } else {
        res.render('pages/auth/index', {
            user: req.user
        });
    }
});

router.get('/restricted', passwordless.restricted(),
    function(req, res) {
        res.render('pages/auth/restricted', {
            user: req.user
        });
    }
);

router.get('/login', function(req, res) {
    res.render('pages/auth/login', {
        user: req.user
    });
});

router.get('/logout', passwordless.logout(),
    function(req, res) {
        res.clearCookie('uid');
        res.redirect('/login');
    }
);

router.post('/sendtoken',
    passwordless.requestToken(
        function(user, delivery, callback) {
            callback(null, user);
        }
    ),
    function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.render('pages/auth/sent');
    }
);

module.exports = router;

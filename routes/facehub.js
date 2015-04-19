var levelup = require('levelup'),
    router = require('express').Router(),
    formidable = require('formidable'),
    path = require('path');

var db = levelup('../db/', {
    valueEncoding: 'json'
});

function getAllUsers(callback) {
    var users = [];
    db.createReadStream({
        fillCache: true
    })
    .on('data', function(data) {
        console.log(data)
        users.push(data.value);
    })
    .on('error', function(err) {
        console.log('Oh my!', err)
    })
    .on('end', function() {
        callback(users);
    });
}

function checkLoginStatus(req, res, callback){
    if (req.user) {
        callback();
    }else{
        res.redirect('/auth/login');
    }
}

router.get('/', function(req, res) {
    checkLoginStatus(req, res, function(){
        getAllUsers(function(users){
            var existing = false;
            users.forEach(function(user){
                if(user.email === req.user){
                    existing = true;
                }
            });


            res.render('pages/index', {
                user: req.user,
                users: users,
                currentEmailExist: existing
            });
        });
    });
});

router.get('/user/:email', function(req, res){
    checkLoginStatus(req, res, function(){
        db.get(req.params.email, function(err, data){
            if(err){
                console.error(err);
            }
            res.json(data);
        });
    });
});


router.get('/upload', function(req, res){
    checkLoginStatus(req, res, function(){
        res.render('pages/upload', {
            user: req.user
        });
    });
});

router.post('/upload', function(req, res){
    // db.get(req.params.email, function(err, data){
    //     if(err){
    //         console.error(err);
    //     }
    //     res.json(data);
    // });
    checkLoginStatus(req, res, function(){
        var form = new formidable.IncomingForm();
        form.multiples = false;
        form.hash = true;
        form.keepExtensions = true;
        form.uploadDir = path.resolve(__dirname, 'public', 'uploads');

        form.parse(req, function(err, fields, files) {
            console.log(JSON.stringify({fields: fields, files: files}, null, 3));
        });
    });
});

module.exports = router;

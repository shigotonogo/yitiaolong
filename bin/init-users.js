#! /usr/local/bin/node

var levelup = require('levelup');

var userList = [{
    "updated_at": "2015-04-19 09:49:05",
    "photo": "http://davidx.qiniudn.com/shaobo_half@2x.jpg",
    "name": "Shaobo Yang",
    "id": 1,
    "phone": "13060245883",
    "skype": "david.xie",
    "email": "sbyang@thoughtworks.com",
    "avatar": "http://davidx.qiniudn.com/shaobo_head@2x.jpg",
    "project": "myfun",
    "raw_image": null,
    "created_at": "2015-04-19 09:49:05",
    "title": "Product Manager"
}, {
    "updated_at": "2015-04-19 09:49:05",
    "photo": "http://davidx.qiniudn.com/bianrui_half@2x.jpg",
    "name": "Rui Bian",
    "id": 2,
    "phone": "13060245883",
    "skype": "david.xie",
    "email": "rbian@thoughtworks.com",
    "avatar": "http://davidx.qiniudn.com/bianrui_head@2x.jpg",
    "project": "myfun",
    "raw_image": null,
    "created_at": "2015-04-19 09:49:05",
    "title": "MD"
}, {
    "updated_at": "2015-04-19 09:49:05",
    "photo": "http://davidx.qiniudn.com/liuliang_half@2x.jpg",
    "name": "Liang Liu",
    "id": 3,
    "phone": "13060245883",
    "skype": "david.xie",
    "email": "liangliu@thoughtworks.com",
    "avatar": "http://davidx.qiniudn.com/liuliang_head@2x.jpg",
    "project": "myfun",
    "raw_image": null,
    "created_at": "2015-04-19 09:49:05",
    "title": "CQO"
}, {
    "updated_at": "2015-04-19 09:49:05",
    "photo": "http://davidx.qiniudn.com/xieling_half@2x.jpg",
    "name": "David Xie",
    "id": 4,
    "phone": "13060245883",
    "skype": "david.xie",
    "email": "zh.li@thoughtworks.com",
    "avatar": "http://davidx.qiniudn.com/xieling_head@2x.jpg",
    "project": "myfun",
    "raw_image": null,
    "created_at": "2015-04-19 09:49:05",
    "title": "MD"
}, {
    "updated_at": "2015-04-19 09:49:05",
    "photo": "http://davidx.qiniudn.com/chengyang_half@2x.jpg",
    "name": "Yang Cheng",
    "id": 5,
    "phone": "13060245883",
    "skype": "david.xie",
    "email": "ycheng@thoughtworks.com",
    "avatar": "http://davidx.qiniudn.com/chengyang_head@2x.jpg",
    "project": "myfun",
    "raw_image": null,
    "created_at": "2015-04-19 09:49:05",
    "title": "MD"
}, {
    "updated_at": "2015-04-19 09:49:05",
    "photo": "http://davidx.qiniudn.com/xiajie_half@2x.jpg",
    "name": "Xia Wang",
    "id": 6,
    "phone": "13060245883",
    "skype": "david.xie",
    "email": "xwang@thoughtworks.com",
    "avatar": "http://davidx.qiniudn.com/xiajie_head@2x.jpg",
    "project": "myfun",
    "raw_image": null,
    "created_at": "2015-04-19 09:49:05",
    "title": "MD"
}, {
    "updated_at": "2015-04-19 09:49:05",
    "photo": "http://davidx.qiniudn.com/dongyuwei_half@2x.jpg",
    "name": "Yuwei Dong",
    "id": 7,
    "phone": "13060245883",
    "skype": "david.xie",
    "email": "ywdong@thoughtworks.com",
    "avatar": "http://davidx.qiniudn.com/dongyuwei_head@2x.jpg",
    "project": "myfun",
    "raw_image": null,
    "created_at": "2015-04-19 09:49:05",
    "title": "MD"
}];

var db = levelup('../db/', {
    valueEncoding: 'json'
});

userList.forEach(function(user) {
    db.get(user.email, function(err, data) {
        if (!data) {
            db.put(user.email, user, function(err) {
                if (err) return console.log('Ooops!', err) 
            })
        }
    })
});
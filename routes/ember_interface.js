var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var common = require('../lib/common');
// var Column = require('../models/column');
var Article = require('../models/ember_api/article');
var pinyin = require('pinyin');
var fs = require('fs');
var multiparty = require('multiparty');
var crypto = require('crypto');

var LoginInfoSchema = mongoose.Schema({
    ip: String,
    time: {
        type:Number,
        default:0
    },
    date: String
}, {
    collection: "login_info"
})
var LoginInfo = mongoose.model('login_info', LoginInfoSchema)

var AdminSchema = mongoose.Schema({
    name: String,
    password: String,
    login_time: Date
}, {
    collection: "admin"
})
var Admin = mongoose.model('admin', AdminSchema)
    // var common=require('common');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/init_conf_data',function(req,res){
    console.log(req.session.user)
    var status=req.session.user?1:0;
    res.send({
        status:status
    })
});
router.post('/login', function(req, res,next) {
    var u = req.body.name,
        p = req.body.password;
    if (!u || !p) {
        res.send({
            code: 2000,
            msg: "用户名或密码不能为空"
        })
        return;
    }
    mongoose.connect('mongodb://localhost/ember_api');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, '连接数据库错误:'));
    db.once('open', function(callback) {
        var ip=common.getClientIp(req);
        LoginInfo.findOne({ip:ip},function(err,doc){

        })
        // yay!
        Admin.findOne({ name: u }, function(err, doc) {
            if (err) return console.error(err);
            // console.log( doc)
            if (doc && p === doc.password) {
                req.session.user = doc;
                res.send({
                    code: 1000,
                    msg: "登陆成功!"
                })
            } else {
                req.session.error = "用户名或密码错误"
                res.send({
                    code: 2000,
                    msg: "用户名或密码错误!",
                    // p:common.md5(p)
                })

            }
            db.close();
        })

    });



    if (!req.session.user) {
        if (req.url !== "/login") {
        //     next(); //如果请求的地址是登录则通过，进行下一个请求
        // } else {
            res.redirect('/login');
        }
    } else {
        res.send({
            code: 1000,
            msg: "已登陆!"
        })
    }
    // res.send('respond with a resource');
});

router.get('/getArticle', function(req, res) {
    var pName = req.query.namespace;
    var name = req.query.property;

    if (!pName || !name) {
        res.send({
            code: 2000,
            msg: "类或方法名不能为空！"
        })
    }
    // var column_id = req.query.column_id;
    // console.log(column_id)
    // console.log("+++++++++++")
    // if (!column_id) {
    //     res.send({
    //         code: 2000,
    //         msg: "栏目id不能为空！"
    //     })
    // }
    mongoose.connect('mongodb://localhost/ember_api');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('ember_api mongoose opened!');
        Article.find({
            pName: pName,
            name: name,
            // column_id: column_id
        }, function(err, doc) {
            if (err) {
                res.send({
                    code: 2000,
                    msg: err
                })
            } else {
                res.send({
                    code: 1000,
                    data: doc
                })
            }
            db.close();
        })
    })
})

module.exports = router;

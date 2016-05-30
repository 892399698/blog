var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var Column = require('../models/column');
var Article = require('../models/ember_api/article');
var pinyin = require('pinyin');
var fs = require('fs');
var multiparty = require('multiparty');
var crypto = require('crypto');
// var common=require('common');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/getArticle', function(req, res) {
    var pName=req.query.pTitle;
    var name=req.query.title;

    if(!pName || !name){
        res.send({
            code:2000,
            msg:"类或方法名不能为空！"
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
            pName:pName,
            name:name,
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

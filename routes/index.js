var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Column=require('../models/column');
var common=require('../lib/common');
/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'My web!' });
  mongoose.connect('mongodb://localhost/column');
  var db=mongoose.connection;
  db.on("error",console.error.bind(console,'connection error:'));
  db.once("open",function(){
    console.log("column db connectioned!");
    Column.find(function(err,doc){
      var title="个人博客";
        if(err){
            console.log("获取栏目信息错误！");
            console.log(err);
            res.render('index',{
                columns:[],
                title:title
            })
        }else{
          var result=common.formatArrByKey(doc,"_id");
            res.render('index',{
                columns:result,
                title:title
            })
        }
        console.log("closed")
        db.close();
    })
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Column=require('../models/column');
var Article=require('../models/article');
var common=require('../lib/common');
/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'My web!' });
  var title="个人博客";
  mongoose.connect('mongodb://localhost/cssbus');
  var db=mongoose.connection;
  // var articleDb = mongoose.createConnection('mongodb://localhost/article');
  db.on("error",console.error.bind(console,'connection error:'));
  // articleDb.on("error",console.error.bind(console,'connection articleDb error:'));
  // var ap,cp;
  db.once("open",function(){
    console.log("db connectioned!");
    var cp = Promise.resolve(Column.find());
    var ap = Promise.resolve(Article.find());
    // // Article.find(function(err,doc){
    // //   console.log(doc)
    // // })
    // //promise 解决多个异步查询
    Promise.all([cp,ap])
    .then(function(docs){
      db.close();
      console.log(docs)
      res.render('index', {columns: docs[0],articles: docs[1],title:"首页"});
    }).catch(function (error) {
      // return next(error);
      res.rend('index',{title:"首页获取数据错误!"});
      console.log(error);
    });
  })
  //   Column.find(function(err,doc){
  //       if(err){
  //           console.log("获取栏目信息错误:");
  //           console.log(err);
  //           res.render('index',{
  //               columns:[],
  //               title:title
  //           })
  //       }else{
  //         console.log(doc)
  //         var result=common.formatArrByKey(doc,"_id");
  //         res.render('index',{
  //             columns:result,
  //             title:title
  //         })
  //       }
        
  //   })
  //   Article.find(function(err,doc){
  //       if(err){
  //           console.log("获取文章信息错误:");
  //           console.log(err);
  //           res.render('index',{
  //               columns:[],
  //               title:title
  //           })
  //       }else{
  //         var result=common.formatArrByKey(doc,"_id");
  //           res.render('index',{
  //               columns:result,
  //               title:title
  //           })
  //         console.log(doc)
  //       }
  //       console.log("closed")
  //       db.close();
  //   })
  // })
  // articleDb.once("open",function(){
  //   console.log("article db connectioned!");
  //   // ap = Promise.resolve(Article.find());

  //   // article.find(function(err,doc){
  //   //     if(err){
  //   //         console.log("获取文章信息错误:");
  //   //         console.log(err);
  //   //         res.render('index',{
  //   //             articles:[],
  //   //             title:title
  //   //         })
  //   //     }else{
  //   //       var result=common.formatArrByKey(doc,"_id");
  //   //         res.render('index',{
  //   //             columns:result,
  //   //             title:title
  //   //         })
  //   //     }
  //   //     console.log("closed")
  //   //     db.close();
  //   // })
  // })
});

module.exports = router;
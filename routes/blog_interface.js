var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/accounts');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/articles', function(req, res, next) {


        mongoose.connect('mongodb://localhost/column')
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('column list mongoose opened!');
            var userSchema = new mongoose.Schema({
                name: {
                    type: String,
                    unique: false
                },
                // password:String
            }, {
                collection: "column"
            });
            var Column = mongoose.model('column', userSchema);

            // User.findOne({name:"WangEr"}, function(err, doc){
            //   if(err) console.log(err);
            //   else console.log(doc.name + ", password - " + doc.password);
            // });
            Column.find(function(err, doc) {
                    if (err) {
                        req.send({
                            code: 2000,
                            msg: err
                        });
                    } else {

                        res.send(doc)
                    }
                })
                // var lisi = new User({name:"LiSi", password:"123456"});
                // var data =new Column(req.body);
                // data.save(function(err, doc){
                //   if(err){
                //     res.send({
                //       code:2000,
                //       msg:err
                //     });
                //   }else{
                //     res.send({
                //       code:1000,
                //       msg:"保存成功!"
                //     });
                //   }
                // });  
        });




    })
    //获取栏目列表
router.get('/columns', function(req, res, next) {
    // res.send({
    //  code:1000,
    //  columns:{
    //    id:1,
    //    name:"测试",
    //    created_at:"2015-11-29",
    //    updated_at:"--"
    //  },
    //  meta:{
    //    total_page:1,
    //    current_page:1,
    //    total_record:1
    //  }
    // })

    mongoose.connect('mongodb://localhost/column')
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('column list mongoose opened!');
        var userSchema = new mongoose.Schema({
            name: {
                type: String,
                unique: false
            },
            // password:String
        }, {
            collection: "column"
        });
        var Column = mongoose.model('column', userSchema);

        // User.findOne({name:"WangEr"}, function(err, doc){
        //   if(err) console.log(err);
        //   else console.log(doc.name + ", password - " + doc.password);
        // });
        Column.find(function(err, doc) {
            if (err) {
                req.send({
                    code: 2000,
                    msg: err
                });
            } else {
                res.send({
                  code:1000,
                  columns:doc
                })
            }
        });

    });
    // db.close(function(){
    //   console.log("close mongodb connection!");
    // })

});
//添加栏目
router.post('/columns', function(req, res, next) {
    // console.log(req);
    console.log(req.body);
    if (!req.body) {
        res.send({
            code: 2000,
            msg: "提交数据不能为空！"
        });
    }
    if (!req.body.name) {
        res.send({
            code: 2000,
            msg: "栏目名称不能为空！"
        });
    }
    // res.send({
    //  code:1000
    // })
    //保存
    mongoose.connect('mongodb://localhost/column')
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('mongoose opened!');
        var userSchema = new mongoose.Schema({
            name: {
                type: String,
                unique: false
            },
            // password:String
        }, {
            collection: "column"
        });
        var Column = mongoose.model('column', userSchema);

        // User.findOne({name:"WangEr"}, function(err, doc){
        //   if(err) console.log(err);
        //   else console.log(doc.name + ", password - " + doc.password);
        // });

        // var lisi = new User({name:"LiSi", password:"123456"});
        var data = new Column(req.body);
        data.save(function(err, doc) {
            if (err) {
                res.send({
                    code: 2000,
                    msg: err
                });
            } else {
                res.send({
                    code: 1000,
                    msg: "保存成功!"
                });
            }
        });
    });






});
router.get('/init_data', function(req, res, next) {
    res.send({
        code: 1000,
        role_can: {

        },
        meta: {
            total_page: 1,
            current_page: 1,
            total_record: 1
        }
    })
})
module.exports = router;

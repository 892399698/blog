var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false
    },
    pid: {
        type: String,
        unique: true
    },
    sort: Number,
    seo_title: String,
    keyword: String,
    desc: String
}, {
    collection: "column"
});
var Column = mongoose.model('column', userSchema);
// mongoose.connect('mongodb://localhost/accounts');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/articles', function(req, res, next) {

        // var mongoose = require('mongoose');
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
        });




    })
    //获取栏目列表
router.get('/columns', function(req, res, next) {
    mongoose.connect('mongodb://localhost/column');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('column list mongoose opened!');
        Column.find(function(err, doc) {
            if (err) {
                req.send({
                    code: 2000,
                    msg: err
                });
            } else {
                res.send({
                    code: 1000,
                    columns: doc
                })
            }
            db.close();
        });

    });

});
//查询栏目详情
router.get('/columns/:id', function(req, res, next) {
        var id = req.params.id;
        if (!id) {
            res.send({
                code: 2000,
                msg: "id不能为空！"
            })
        }
        mongoose.connect('mongodb://localhost/column');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('column mongoose opened!');
            Column.findOne({
                _id: id
            }, function(err, doc) {
                if (err) {
                    req.send({
                        code: 2000,
                        msg: err
                    });
                } else {
                    res.send({
                        code: 1000,
                        column: doc
                    })
                }
                db.close();
            });

        });
        // console.log(id);
    })
    //添加栏目
router.post('/columns', function(req, res, next) {
    // console.log(req);
    console.log(req.body);
    var rData = req.body;
    if (!rData) {
        res.send({
            code: 2000,
            msg: "提交数据不能为空！"
        });
    }
    if (!rData.name) {
        res.send({
            code: 2000,
            msg: "栏目名称不能为空！"
        });
    }
    //父栏目

    var saveData = {
        parent_id: rData.parent_id || 0,
        name: rData.name,
        sort: rData.sort,
        seo_title: rData.seo_title,
        keyword: rData.keyword,
        desc: rData.desc,
        created_at: (new Date()).getTime()
    }

    //保存
    mongoose.connect('mongodb://localhost/column');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('mongoose opened!');
        var data = new Column(saveData);
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
            db.close();
        });
    });

});
//编辑栏目
router.put('/columns/:id', function(req, res) {
    var rData = req.body;
    if (!rData || !rData.column) {
        res.send({
            code: 2000,
            msg: "提交数据不能为空！"
        });
    }
    rData = rData.column;
    if (!rData.name) {
        res.send({
            code: 2000,
            msg: "栏目名称不能为空！"
        });
    }
    //父栏目
    var id = req.params._id;

    var saveData = {
        parent_id: rData.parent_id || 0,
        name: rData.name,
        sort: rData.sort,
        seo_title: rData.seo_title,
        keyword: rData.keyword,
        desc: rData.desc,
        updated_at: (new Date()).getTime()
    }

    //保存
    mongoose.connect('mongodb://localhost/column');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('mongoose opened!');
        // var data = new Column(saveData);
        Column.update({
            _id: id
        }, saveData, function(err) {
            if (err) {
                res.send({
                    code: 2000,
                    msg: "更新失败！"
                })
            } else {
                res.send({
                    code: 1000
                })
            }
            db.close();
        });
    });

});
//删除栏目
router.delete('/columns/:id', function(req, res) {
    // console.log(req)
    var id = req.params.id;
    mongoose.connect('mongodb://localhost/column');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('delete mongoose opened!');
        Column.remove({
            _id: id
        }, function(err, doc) {
            if (err) {
                res.send({
                    code: 2000,
                    msg: "删除失败！"
                })
            } else {
                res.send({
                    code: 1000
                })
            }
            db.close();
        })
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

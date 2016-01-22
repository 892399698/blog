var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Column = require('../models/column');
var Article = require('../models/article');
var pinyin = require('pinyin');
var fs = require('fs');
var multiparty = require('multiparty');
var crypto = require('crypto');
// var multipartyMiddleware=multiparty();

// var userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         unique: true
//     },
//     parent_id: {
//         type: String,
//         // unique: true
//     },
//     sort: String,
//     seo_title: String,
//     keyword: String,
//     desc: String,
//     created_at:Date,
//     updated_at:Date,
//     // parent_id:Number
// }, {
//     collection: "column"
// });
// var Column = mongoose.model('column', userSchema);
// mongoose.connect('mongodb://localhost/accounts');
/* GET users listing. */
function md5(content) {
    var content = content;
    if (!content) {
        return content;
    }
    var md5 = crypto.createHash('md5');
    md5.update(content);
    var d = md5.digest("hex");
    return d;
}
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//添加文章
router.post('/articles', function(req, res) {
    var rData = req.body.article,
        msg = '';
    console.log(rData)
    if (!rData) {
        msg = "提交数据不能为空！";
    } else if (!rData.title) {
        msg = "文章标题不能为空！";
    } else if (!rData.column_id) {
        msg = "栏目不能为空！";
    } else if (!rData.body) {
        msg = "内容不能为空！";
    }
    if (msg) {
        res.send({
            code: 2000,
            msg: msg
        })
        return false;
    }
    //父栏目
    var time = new Date();
    var saveData = {
        title: rData.title,
        keyword: rData.keyword,
        column_id: rData.column_id,
        description: rData.description,
        flag: rData.flag,
        click: rData.click,
        state: rData.state,
        body: rData.body,
        created_at: time,
        updated_at: time
    }

    mongoose.connect('mongodb://localhost/article');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('article mongoose opened!');
        var data = new Article(saveData);
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
    })

})
router.get('/articles', function(req, res) {
    var column_id = req.query.column_id;
    // console.log(column_id)
    // console.log("+++++++++++")
    if (!column_id) {
        res.send({
            code: 2000,
            msg: "栏目id不能为空！"
        })
    }
    mongoose.connect('mongodb://localhost/article');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('article list mongoose opened!');
        Article.find({
            column_id: column_id
        }, function(err, doc) {
            if (err) {
                res.send({
                    code: 2000,
                    msg: err
                })
            } else {
                res.send({
                    code: 1000,
                    articles: doc
                })
            }
            db.close();
        })
    })
})

router.get('/articles/:id', function(req, res) {
        var id = req.params.id;
        console.log(id)
        if (!id) {
            res.send({
                code: 2000,
                msg: "id不能为空！"
            })
        }
        mongoose.connect('mongodb://localhost/article');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('article list mongoose opened!');
            Article.findOne({
                _id: id
            }, function(err, doc) {
                if (err) {
                    res.send({
                        code: 2000,
                        msg: err
                    })
                } else {
                    doc.id=doc._id
                    console.log(doc)
                    res.send({
                        code: 1000,
                        article: doc
                    })
                }
                db.close();
            })
        })
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
router.post('/columns', function(req, res) {
    // console.log(req);
    // console.log(req.body);
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
    var link = '/' + pinyin(rData.name);
    var saveData = {
        parent_id: rData.parent_id || 0,
        name: rData.name,
        sort: rData.sort,
        seo_title: rData.seo_title,
        keyword: rData.keyword,
        desc: rData.desc,
        created_at: (new Date()),
        updated_at: (new Date()),
        link: link
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
    var id = req.params.id;

    var saveData = {
            parent_id: rData.parent_id || 0,
            name: rData.name,
            sort: rData.sort,
            seo_title: rData.seo_title,
            keyword: rData.keyword,
            desc: rData.desc,
            updated_at: (new Date())
        }
        //保存
    mongoose.connect('mongodb://localhost/column');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('mongoose opened!');
        // var data = new Column(saveData);
        console.log(id)
        Column.update({
            _id: id
        }, {
            $set: saveData
        }, function(err) {
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

//图片上传
router.post('/upload_img', function(req, res) {
    // console.log(req.body, req.files);
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        // res.writeHead(200, {'content-type': 'text/plain'});
        // res.write('received upload:\n\n');
        // res.end(util.inspect({fields: fields, files: files}));
        console.log(fields, files.file);
        var tmpPath = files.file[0].path;
        var basePath = __dirname + '/../public/uploads/';
        var originalFilename = files.file[0].originalFilename;
        var imgNameSplit = originalFilename.split(".");
        var l = imgNameSplit.length;

        var ex = imgNameSplit[l - 1];

        var fileName = md5(imgNameSplit[0]) + (new Date()).getTime() + "." + ex;
        var targetPath = basePath + files.file[0].fieldName + fileName;
        console.log(targetPath)
        console.log(tmpPath)

        fs.exists(basePath, function(exists) {
                if (!exists) {
                    fs.mkdirSync(basePath, "666");
                }
                fs.rename(tmpPath, targetPath, function() {
                    if (err) {
                        res.send({
                            src: "",
                            msg: err,
                            success: false
                        })
                    }
                    res.send({
                            src: "/uploads/" + files.file[0].fieldName + fileName,
                            success: true
                        })
                        //删除临时文件
                    fs.unlink(tmpPath, function() {
                        if (err) {
                            console.log('删除临时文件失败！')
                            throw err;
                        }

                    })
                })



            })
            // res.send({
            //     attachment_id: 4,
            //     src: "http://qnudeskpub.flyudesk.com/[@BVB3V$FD]38]9[6P23JLL-1448533040-1452154078.gif",
            //     success: true
            // })
    });
    // res.send({
    //     attachment_id: 4,
    //     src: "http://qnudeskpub.flyudesk.com/[@BVB3V$FD]38]9[6P23JLL-1448533040-1452154078.gif",
    //     success: true
    // })
})
module.exports = router;

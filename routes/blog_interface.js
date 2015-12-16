var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/articles',function(req,res,next){
	res.send({
		code:1000,
		items:{
			id:1,
			title:"测试",
			created_at:"2015-11-29",
			updated_at:""
		},
		meta:{
			total_page:1,
			current_page:1,
			total_record:1
		}
	})
})
//获取栏目列表
router.get('/columns',function(req,res,next){
	res.send({
		code:1000,
		columns:{
			id:1,
			name:"测试",
			created_at:"2015-11-29",
			updated_at:"--"
		},
		meta:{
			total_page:1,
			current_page:1,
			total_record:1
		}
	})
});
//添加栏目
router.post('/columns',function(req,res,next){
	// console.log(req);
	console.log(req.body);
	if(!req.body){
		res.send({
			code:2000,
			msg:"提交数据不能为空！"
		});
	}
	if(!req.body.name){
		res.send({
			code:2000,
			msg:"栏目名称不能为空！"
		});
	}
	res.send({
		code:1000
	})
});
router.get('/init_data',function(req,res,next){
	res.send({
		code:1000,
		role_can:{
				
		},
		meta:{
			total_page:1,
			current_page:1,
			total_record:1
		}
	})
})
module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/article',function(req,res,next){
	res.send({
		title:"测试",
		create_at:"2015-11-29",
		update_at:""
	})
})
module.exports = router;

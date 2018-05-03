var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '泓唛游戏中心' });
});


router.get('/chess',function(req,res,next){
	res.render('chess',{title:'中国象棋'})
});

module.exports = router;

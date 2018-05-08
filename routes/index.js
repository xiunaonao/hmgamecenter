var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chess', function(req,res,next){
	res.render('chess/index',{title: 'chess'});
})

router.get('/room', function(req,res,next){
	res.render('chess/room',{title: 'chess'});
})

module.exports = router;

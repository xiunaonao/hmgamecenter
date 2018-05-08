var express = require('express');
var router = express.Router();
var database=require('../server/database');

/* GET home page. */
router.get('/editor', (req, res, next) =>{
	res.render('sign/editor', { title: '报名编辑器' });
	let id=req.query.id;
	if(id)
		database.query('formInfo',{id:parseInt(id)},(err,result)=>{
			console.log(err);
			console.log(result);
			res.render('sign/show', { title: '报名' ,data:result});
		})
	else
		res.render('sign/show',{title:''})
});

router.get('/show', (req, res, next)=>{
	let id=req.query.id;
	database.query('formInfo',{id:parseInt(id)},(err,result)=>{
		console.log(err);
		console.log(result);
		res.render('sign/show', { title: result[0].title ,data:result[0]});
	})
	
});

router.get('/data',(req,res,next)=>{
	let id=req.query.id;
	database.query('formDataInfo',{sysid:parseInt(id)},(err,result)=>{
		console.log(err);
		console.log(result);
		res.render('sign/data',{
			id:id,
			data:result
		})
	});

})

module.exports = router;
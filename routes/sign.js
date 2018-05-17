var express = require('express');
var router = express.Router();
var database=require('../server/database');

/* GET home page. */
router.get('/editor', (req, res, next) =>{
	let id=req.query.id;
	if(id)
		database.query('formInfo',{id:parseInt(id)},(err,result)=>{
			console.log(err);
			console.log(result);
			//res.render('sign/editor',{data:{name:'abc'},id:1})
			//res.render('sign/show', { title: '报名' ,data:result});
			res.render('sign/editor', { title: (result.length>0?result[0].title:'') ,data:(result.length>0?result[0]:({rows:[]}))});
		})
	else
		res.render('sign/editor',{title:'新建报名',data:{rows:[]}})
});

router.get('/show', (req, res, next)=>{
	let id=req.query.id;
	
	database.query('formInfo',{id:parseInt(id)},(err,result)=>{
		console.log(err);
		console.log(result);
		res.render('sign/show', { title: (result.length>0?result[0].title:'') ,data:(result.length>0?result[0]:{})});
	})
	
});

router.get('/data',(req,res,next)=>{
	let id=req.query.id;
	res.render('sign/data',{title:"报名数据",id:id});
	// database.query('formDataInfo',{sysid:parseInt(id)},(err,result)=>{
	// 	console.log(err);
	// 	console.log(result);
	// 	res.render('sign/data',{
	// 		title:(result.length>0?result[0].title:''),
	// 		id:id,
	// 		data:result
	// 	})
	// });

})

module.exports = router;
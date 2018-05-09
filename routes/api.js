var express = require('express');
var router = express.Router();
var database=require('../server/database');

/* GET users listing. */
router.post('/form_submit', function(req, res, next) {
	var body=req.body;
	let table="formDataInfo";
	var form=req.body;

	form.id='1525767754124'+parseInt(1000000+Math.random()*1000000);
	var date=new Date();
	form.createTime=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

	database.insert(table,[form],function(err,data){
		console.log(data);
		var json={};
		if(err){
			json.success=0;
		}else{
			json.success=data.result.ok;
			json.count=data.insertedCount;
			json.data=data.ops;
		}
		res.json(json);
	});
	
});

router.get('/form_data',(req,res,next)=>{
	let id=req.query.id;
	database.query('formDataInfo',{sysid:parseInt(id)},(err,data)=>{
		console.log(err);
		if(err){
			res.json({success:0,id,data})
			return;
		}
		console.log(data);
		res.json({
			success:1,
			title:(data.length>0?data[0].title:''),
			id,
			data
		})
	});
});

module.exports = router;

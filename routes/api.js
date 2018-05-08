var express = require('express');
var router = express.Router();
var database=require('../server/database');

/* GET users listing. */
router.post('/form_submit', function(req, res, next) {
	var body=req.body;
	let table="formDataInfo";
	var form=req.body;

	form.id='1525767754124'+(1000000+Math.random()*1000000);
	database.insert(table,[form],function(err,ress){
		console.log(ress);
		var json={};
		if(err){
			json.success=0;
		}else{
			json.success=ress.result.ok;
			json.count=ress.insertedCount;
			json.data=ress.ops;
		}
		res.json(json);
	});
	
});

module.exports = router;

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

router.get('/form_execl',(req,res,next)=>{
	let id=req.query.id;
	let nodeExcel = require('excel-export');
	var conf = {};
	database.query('formDataInfo',{sysid:parseInt(id)},(err,data)=>{
		conf.cols=[]
		conf.rows=new Array()
		let first=[]

		data.forEach((k,i)=>{
			let keys=Object.keys(k.rows)
			let rows=new Array()
			keys.forEach((k2,j)=>{
				console.log(first[j])
				if(!first[j]){
					first[j]=k2
					conf.cols.push({
						  caption: k2,
		                  type: 'string',
		                  width: 10
					});
				}
				rows.push(k.rows[k2]);

				
			})
			conf.rows.push(rows)

		})
		conf.data=data;
		res.json(conf);

		return;
		var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "transaction.xlsx");
        res.end(result, 'binary');




	});
})

module.exports = router;

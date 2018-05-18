var express = require('express')
var router = express.Router()
var database=require('../server/database');
var fs=require('fs');

var multer=require("multer")
var upload=multer({ dest: 'uploads_temp/' })
/* GET users listing. */
router.post('/form_submit', function(req, res, next) {
	var body=req.body;
	let table="formDataInfo";
	var form=req.body;

	form.id=new Date().getTime()+parseInt(1000000+Math.random()*1000000);
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

router.get('/form_detail',(req,res,next)=>{
	let id=req.query.id;
	database.query('formInfo',{id:parseInt(id)},(err,result)=>{
		console.log(err);
		console.log(result);
		let json={}
		if(err){
			json.title=''
			json.success=0
			json.data=[]
		}else{
			json.success=1
			json.title=(result.length>0?result[0].title:'')
			json.data=(result.length>0?result[0]:{})
		}
		
		res.json(json)
	})
})

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
})

router.get('/form_execl',(req,res,next)=>{
	let id=req.query.id;
	let nodeExcel = require('excel-export');
	var conf = {};
	database.query('formDataInfo',{sysid:parseInt(id)},(err,data)=>{
		if(err){
			res.json(err)
			return
		}
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
		// conf.data=data;
		// res.json(conf);

		// return;
		var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "formdata.xlsx");
        res.end(result, 'binary');




	});
})


router.post('/upload',upload.any(),(req,res,next)=>{
	//console.log(req.files)
	if(req.files.length<=0){
		res.json({success:0,msg:'未上传任何文件'})
		return
	}
	let imgs=[]
	let index=0
	let readImg=(item,i)=>{
		let filename='/public/temp/'+(new Date().getTime()+parseInt(1000000+Math.random()*1000000))+index+item.originalname.substring(item.originalname.lastIndexOf('.'))
		console.log(i+":"+filename)
		fs.readFile(item.path,(err,data)=>{
			fs.writeFile('.'+filename,data,(err)=>{
				if(!err)
					imgs.push(filename.replace('/public',''))
				console.log(imgs)
				if(index==req.files.length-1){
					let json={};
					if(imgs.length==0){
						json.success=0
						json.msg='上传失败'
					}else{
						json.success=1
						if(imgs.length==req.files.length){
							json.msg="上传成功"
						}else{
							json.msg="上传图片成功"+imgs.length+"个,失败"+(req.files.length-imgs.length)+""
							json.totalNum=req.files.length
							json.successNum=imgs.length
						}
						json.url=imgs.join(',')
						json.imgs=imgs
					}
					res.json(json)
				}else{
					index++
					readImg(req.files[index],index)
				}
			})
		})
	}
	readImg(req.files[0],0)
})

router.get('/feedback_info',(req,res,next)=>{

	database.query('feedbackInfo',{},(err,data)=>{
		console.log(err);
		if(err){
			res.json({success:0,msg:err,data})
			return;
		}
		console.log(data);
		res.json({
			success:1,
			data
		})
	});
})

router.post('/feedback_add',(req,res,next)=>{
	let table="feedbackInfo"
	let form=req.body
	console.log(form)
	let date=new Date()
	form.id=date.getTime()+parseInt(1000000+Math.random()*1000000);
	form.createTime=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

	let json={}
	json.success=0
	/*
	"mobile":13838383838,
	"name":"曾先生",
	"context
	*/
	if(!form.name){
		json.msg="请输入姓名"
		res.json(json)
		return
	}else if(!form.context){
		json.msg="请输入内容"
		res.json(json)
		return
	}else{

	}

	database.insert(table,[form],(err,data)=>{
		
		if(err){
			json.success=0
		}else{
			json.success=1
			json.count=data.insertedCount
			json.data=data.ops
		}
		res.json(json)
	})

})

module.exports = router;

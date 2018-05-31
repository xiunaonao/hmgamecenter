let express=require('express');
let wechat=require('../server/wechat');
let router=express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
	//req.cookie('hm_code')
	//req.cookie('hm_user',)
	//021av9rN1fZcU21r5crN1LO2rN1av9rX
	//wechat.get
	//res.render('index', { title: 'Express' });
});

router.get('/chess', function(req,res,next){
	let code=req.query.code;
	console.log("身份证");
	if(req.cookies["hm_user"] && !code){
		let data=JSON.parse(req.cookies['hm_user'])
		res.render('chess/index',{data})
	}
	else{
		wechat.get_web_token(code,(data)=>{
			let access_token=data.access_token
			let openid=data.openid
			wechat.get_user(access_token,openid,(data)=>{
				console.log('---------------------用户信息------------------')
				console.log(data)
				if(data.errcode){
					res.json({success:false});
					return;
				}
				res.cookie('hm_user',JSON.stringify(data))
				res.render('chess/index',{data})
			})
		})
	}
})

router.get('/room', function(req,res,next){
	res.render('chess/room',{title: 'chess'});
})

router.get('/roomList', function(req,res,next){
	res.render('chess/roomList',{title:'chess'});
})

router.get('/chessboard', function(req,res,next){
	res.render('chess/chessboard',{title:'chess'});
})

router.get('/feedback', function(req,res,next){
	res.render('feedback',{title:'feedback'});
})

module.exports=router;
var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{
	res.json({});
})

router.get('/wechat',(req,res,next)=>{
	if(req.query.code){
		res.redirect('http://127.0.0.1:3000/gameServer/chess?code='+req.query.code);
		//res.json({"code":req.query.code});
	}else{
		res.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx13b573fe3208da3c&redirect_uri=http%3a%2f%2fgame.123zou.com%2fwechat&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`)
	}
})

module.exports = router;

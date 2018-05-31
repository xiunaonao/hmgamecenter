var request=require('request')

let wechat={
	appid:'wx13b573fe3208da3c',
	secret:'c3c69fff71f869c07a010d53fbf297eb',
	get_sys_token:(callback)=>{
		let url=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wechat.appid}&secret=${wechat.secret}`
		request(url,(err,res,body)=>{
			console.log(body)
			callback(body.access_token)
		})

		//console.log(url)
	},
	get_web_token:(code,callback)=>{
		let url=`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wechat.appid}&secret=${wechat.secret}&code=${code}&grant_type=authorization_code`;
		request(url,(err,res,body)=>{
			console.log(typeof body);
			console.log(body)
			if(callback)
				callback(JSON.parse(body))
		})
	},
	get_user:(token,openid,callback)=>{
		let url=`https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=${openid}&lang=zh_CN`
		request(url,(err,res,body)=>{
			//console.log(body)
			if(callback)
				callback(JSON.parse(body))
		})
	}

}
//wechat.get_token()
module.exports=wechat
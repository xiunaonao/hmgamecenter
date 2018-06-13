let db=require('../database')

const _gameUser={
	query:(openid,callback)=>{
		db.query('userInfo',{'openid':openid},(err,result)=>{
			callback(err,result)
		})
	},
	insert:(data,callback)=>{
		let dat={
			id:data.openid,
			wechat_data:data,
			openid:data.openid,
			win_rate:0,
			match_count:0,
			win_count:0,
			memberId:0,
			mobile:'',
			real_name:'',
			idcard:'',
			nick_name:data.nickname
		}
		db.insert('userInfo',[dat],(err,result)=>{
			//console.log(err)
			callback(err,result)
		})
	}
}


module.exports=_gameUser
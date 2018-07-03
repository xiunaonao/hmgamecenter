let db=require('./database')

let wait_players=[];
let ready_players={};
let players_detail={}
let start_player={}
let step_player={}
let win_player={}
let _socket={
	chess:(io)=>{
		io.on('connection',(socket)=>{
			//console.log('一个新的用户发起了访问')
			socket.on('wait',(user)=>{
				//console.log(user.name+'-（'+socket.id+'）-正在等待匹配')
				wait_players.push(socket.id)
				players_detail[socket.id]=user
				

			})
			socket.on('waitting',(user)=>{
				console.log('当前队列内的玩家共'+ wait_players.length);
				if(wait_players.length>1 || ready_players[socket.id]){
					if(!ready_players[socket.id]){
						let r=parseInt(Math.random()*wait_players.length)
						if(wait_players[r]==socket.id){
						 	if(r!=0){
								r--;
							}else{
								r++;
							}
						}
						let emeny=wait_players[r]
						wait_players.splice(r,1)
						wait_players.splice(wait_players.indexOf(socket.id),1)
						let emenyObj=players_detail[emeny]
						ready_players[emeny]=socket.id
						ready_players[socket.id]=emeny;
						db.insert('gameAttackInfo',
								[{
							 		"id":(new Date()).getTime()+''+socket.id,
							 		"name":"",
							 		"state_date":new Date(),
							 		"end_date":null,
							 		"game_id":1,
							 		"match_id":0,
							 		"status":0,
							 		"players":[
							 			{
							 				"id":user.openid,
							 				"name":user.name,
							 				"head":user.headimgurl,
							 				"type":1,
							 				"status":1
							 			},
							 			{
							 				"id":emenyObj.openid,
							 				"name":emenyObj.name,
							 				"head":emenyObj.headimgurl,
							 				"type":2,
							 				"status":1
							 			}
							 		],
							 		"step":[
							 		],
							 		"winplayer":""
							 	}],(err,result)=>{
							 		//console.log(result)
							 		if(result.result.ok==1){
							 			//console.log(result)
							 			emenyObj.attackid=result.insertedIds
										players_detail[socket.id].attackid=result.insertedIds
										//console.log(players_detail[socket.id])
										start_player[socket.id]=0
										//console.log(socket.id+' 进入游戏，成为1号玩家')
										socket.emit('gameready',{emeny:emeny,attackid:result.insertedIds,emenyObj:emenyObj,type:1})
							 		}else{
							 			//console.log(err)
							 			console.log('网络异常')
							 		}

							})

					}else{

						if(start_player[ready_players[socket.id]]!=undefined){
							var emenyObj=players_detail[ready_players[socket.id]]
							start_player[socket.id]=0

							//console.log(socket.id+' 进入游戏，成为2号玩家')
							socket.emit('gameready',{emeny:ready_players[socket.id],attackid:emenyObj.attackid,emenyObj:emenyObj,type:2})
				 		}else{
				 			//console.log(ready_players[socket.id])
				 			console.log('网络异常')
				 		}
					}


				}
			})

			socket.on('cancel_ready',(user)=>{
				var enemy=ready_players[socket.id];
				ready_players[enemy]='not_ready';
				ready_players[socket.id]='not_ready';
			})

			socket.on('ready',(user)=>{
				start_player[socket.id]=1;
			})

			socket.on('readying',(user)=>{
				if(ready_players[socket.id]=='not_ready'){
					ready_players[socket.id]=undefined;
					socket.emit('cancel_ready',{});
					return;
				}
				if(!ready_players[socket.id]){
					return;
				}
				if(start_player[ready_players[socket.id]]==1){
					if(start_player[socket.id]==1)
						socket.emit('gamestart',{step:{},index:0})
					else
						socket.emit('emeny_ready_start',{ready:1})
				}else{
					socket.emit('emeny_ready_start',{ready:0})
				}
			})

			socket.on('step',(obj)=>{
				let attid=players_detail[socket.id].attackid
				db.query('gameAttackInfo',{"_id":attid[0]},(err,result)=>{
					//console.log(err)
					//console.log(result)
					var data=result[0];
					data.step.push(obj.stepData);
					db.update('gameAttackInfo',data,{"_id":attid[0]},(err,result)=>{
						step_player[socket.id]=obj.stepData
					})
				})
			})

			socket.on('step_enemy',(obj)=>{
				if(step_player[ready_players[socket.id]]){
					socket.emit('step_enemy',step_player[ready_players[socket.id]])
					step_player[ready_players[socket.id]]=null
				}
			})

			socket.on('game_result',()=>{
				if(win_player[ready_players[socket.id]]!=undefined){
					console.log('应该只会执行一次吧');
					db.query('gameAttackInfo',{"_id":players_detail[socket.id].attackid[0]},(err,result)=>{
						//console.log(err)
						//console.log(result)
						var data=result[0]
						//data.step.push(obj.stepData);
						data.winplayer=win_player[socket.id]?players_detail[socket.id].openid:players_detail[ready_players[socket.id]].openid
						db.update('gameAttackInfo',data,{"_id":players_detail[socket.id].attackid[0]},(err,result)=>{
							console.log('获取游戏结果')
							//console.log(result)
							db.query('userInfo',{"openid":players_detail[socket.id].openid},(err,result)=>{
								var win_c=result[0].win_count;
								var match_c=result[0].match_count;
								db.update('userInfo',{"win_count":win_player[socket.id]?(win_c+1):win_c,"match_count":match_c+1},{"openid":players_detail[socket.id].openid},(err,result)=>{
									console.log('胜利的玩家');
									console.log(result);
									db.query('userInfo',{"openid":players_detail[ready_players[socket.id]].openid},(err,result)=>{
										var win_c=result[0].win_count;
										var match_c=result[0].match_count;
										db.update('userInfo',{"win_count":win_player[ready_players[socket.id]]?(win_c+1):win_c,"match_count":match_c+1},{"openid":players_detail[ready_players[socket.id]].openid},(err,result)=>{
											//console.log(result);
											console.log('游戏结束');
											var em=ready_players[socket.id]
											
											delete win_player[em]
											delete ready_players[em]

											delete win_player[socket.id]
											delete ready_players[socket.id]

										})
									})



								})
							})

							
							
						})
					})

					socket.emit('game_result',{'enemy_win':win_player[ready_players[socket.id]]});
				}
			})

			socket.on('gameover',(obj)=>{
				win_player[socket.id]=obj.win;
				if(win_player[ready_players[socket.id]]==!obj.win){
					socket.emit('game_result',{win:obj.win})
					//io.sockets.socket(ready_players[socket.id]).emit('game_result',{win:!obj.win})
				}
			})

		})
	}
}

module.exports=_socket
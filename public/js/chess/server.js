var _SERVER=function(){
	var socket=null;
	var isReady=0;
	var player_type=0;
	var emenyTime=90;
	var yourTime=90;
	var yourRound=0;
	var network_wait=true;
	var nowEnemy=null;
	var waitOver=false;

	var timeTotal=setInterval(function(){
		console.log(network_wait);
		if(network_wait){
			return;
		}
		if(yourTime<=-1){
			clearInterval(timeTotal);
			method.matchOver(false);
			return;
		}
		if(emenyTime<=-1){
			clearInterval(timeTotal);
			method.matchOver(true);
			return;
		}


		emeny_time.innerText=parseInt(emenyTime/60)+':'+(emenyTime%60<10?'0':'')+''+(emenyTime%60);
		your_time.innerText=parseInt(yourTime/60)+':'+(yourTime%60<10?'0':'')+''+(yourTime%60);
		if(method.stepIndex%2==(yourRound-1)){
			yourTime--;
		}else{
			emenyTime--;
		}

		
	},1000)

	function send(name,obj,callback){
		socket.emit(name,obj);
	}

	function receive(name,callback){
		socket.on(name,function(obj){
			callback(obj);
		})
	}
	//var user=JSON.stringify
	var obj={
		connect:function(){
			socket=io.connect('/');
		},
		matchOver:function(win,callback){
			clearInterval(timeTotal);
			//console.log('???');
			network_wait=true;
			send('gameover',{win:win});
			var getResult=setInterval(function(){
				send('game_result',{})
			},500)

			receive('game_result',function(obj){
				clearInterval(getResult);
				callback(obj.win);
			})
		},
		rewait:function(){
			send('wait',{name:user_name,openid:user_id,headimgurl:user_head})

			waitOver=false;
			var waitting=setInterval(function(){
				if(waitOver){
					clearInterval(waitting);
				}else{
					send('waitting',{name:user_name,openid:user_id,headimgurl:user_head});
				}
			},3000);
		},
		wait:function(){
			send('wait',{name:user_name,openid:user_id,headimgurl:user_head})

			waitOver=false;
			var waitting=setInterval(function(){
				if(waitOver){
					clearInterval(waitting);
				}else{
					send('waitting',{name:user_name,openid:user_id,headimgurl:user_head})
				}
			},3000);

			receive('gameready',function(obj){
				console.log(obj);
				nowEnemy=obj;
				waitOver=true;
				console.log('游戏即将开始');
				player_type=obj.type;
				method.readyGame();
			})


			var readyOver=false;
			var readying=setInterval(function(){
				if(readyOver){
					clearInterval(readying);
				}else{
					send('readying',{});
				}
			},3000)

			receive('cancel_ready',()=>{
				method.loadingGame();
				server.rewait();
			})

			receive('emeny_ready_start',function(obj){
				var no='';
				var yes='';
				if(obj.ready==1){
					no='none';
					yes='inline-block';
				}else{
					yes='none';
					no='inline-block';

				}
				emeny_ready_not.style.display=no;
				emeny_ready_ok.style.display=yes;
				
			})

			receive('gamestart',function(obj){
				ready=-1;
				readyOver=true;
				emeny_ready_not.style.display='none';
				emeny_ready_ok.style.display='block';
				emeny_ready_ok.style.opacity=0;
				console.log('游戏开始，'+(player_type==1?'我方':'对方')+'开始移动')
				if(player_type==1){
					yourRound=1;
				}else{
					yourRound=2;
				}
				network_wait=false;
				console.log(network_wait);
				method.initTable(true);

				server.receiveStep();
				console.log(nowEnemy);
				enemyName.innerText=nowEnemy.emenyObj.name;
				enemyHead.setAttribute('src',nowEnemy.emenyObj.headimgurl);
			})



		},
		ready:function(){
			if(isReady!=-1){

				if(isReady==1){
					isReady=0;
				}else{
					isReady=1;
				}

				send('ready',{ready:isReady});
				


			}
		},
		cancelReady:function(){
			send('cancel_ready',{});
		},
		getRound:function(){
			return yourRound;
		},
		sendStep:function(){
			//console.log(method.moveObject);
			yourTime=90;
			emenyTime=90;
			send('step',{stepData:method.moveObject});
			//network_wait=true;
		},
		receiveStep:function(){
			setInterval(function(){
				send('step_enemy',{});
			},1500);

			receive('step_enemy',function(obj){
				network_wait=false;
				method.enemyMove(obj);
				emenyTime=90;
				yourTime=90;
			});
		},

	}

	return obj;
}


var server=new _SERVER();
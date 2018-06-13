
var chess=new _CHESS('#cav');




//})();



var method={
	choosePiece:null,
	movePoints:[],
	moveObject:{},
	stepIndex:0,
	gameover:false,
	matchOver:function(win){
		server.matchOver(win,function(){
			chess.createSpr('result',{type:1,img:win?chess.img.win:chess.img.lose,zindex:999})
			chess.createSpr('result_btn',{type:1,img:chess.img.btn,zindex:999,y:300})
			chess.spr.result_btn.click=function(){
				location.href="chess";
			}
			method.gameover=true;
		});

	},
	loadingGame:function(){
		if(!chess.spr.load_bg)
			chess.createSpr('load_bg',{type:3,w:360,h:405,bcolor:'rgba(0,0,0,0.5)',lcolor:'rgba(0,0,0,0.5)'})
		if(chess.spr.beginGameTxt)
			chess.removeSpr(chess.spr.beginGameTxt);
		if(chess.spr.beginGameBox)
			chess.removeSpr(chess.spr.beginGameBox);
		if(chess.spr.load_txt)
			chess.removeSpr(chess.spr.load_txt);
		if(chess.spr.loading)
			chess.removeSpr(chess.spr.loading);

		chess.createSpr('load_txt',{type:2,text:'正在匹配中',lcolor:'#fff',size:15,y:300})
		chess.spr.load_txt.event=function(){
			this.text='正在匹配中';
			this.text+=(this.timeIndex%90>=0?'.':' ');
			this.text+=(this.timeIndex%90>=30?'.':' ');
			this.text+=(this.timeIndex%90>=60?'.':' ');
		}

		chess.createSpr('loading',{type:1,img:chess.img.loading});
		chess.spr.loading.rotate=0;
		chess.spr.loading.event=function(){
			this.rotate=-this.timeIndex*4;
			if(this.imeIndex==89){
				this.timeIndex=0;
			}
		}
	},
	readyGame:function(){
		chess.removeSpr(chess.spr.load_txt);
		chess.removeSpr(chess.spr.loading);

		chess.createSpr('beginGameBox',{img:chess.img.beginGameTxt,type:1,zindex:999});
		chess.createSpr('beginGameTxt',{text:'已找到对手，是否开始游戏(15s)',type:2,zindex:999,size:16});
		chess.spr.beginGameTxt.beginTime=new Date();
		chess.spr.beginGameTxt.event=function(){
			var sec=((new Date())-this.beginTime)/1000;
			if(sec>15){
				chess.removeSpr(chess.spr.beginGameTxt);
				chess.removeSpr(chess.spr.beginGameBox);
				chess.removeSpr(chess.spr.beginGameBtn);
				server.cancelReady();
				//method.loadingGame();
				return;
			}
			this.text='已找到对手，是否开始游戏('+(15-parseInt(sec)+'s)');
		}
		chess.createSpr('beginGameBtn',{img:chess.img.beginGame,type:1,zindex:999,y:260});
		chess.spr.beginGameBtn.click=function(){
			server.ready();
			chess.spr.beginGameTxt.text='已准备就绪，等待对方准备中';
			delete chess.spr.beginGameTxt.event;
			chess.removeSpr(this);

		}

	},
	initGame:function(){
		server.connect();
		server.wait();

		//(function(){
		var srcs='/img/chess/';
		chess.loadImageAll({
			'bg':srcs+'棋盘.jpeg',
			'loading':srcs+'loading.png',
			'ju1':srcs+'车.png',
			'ma1':srcs+'马.png',
			'xiang1':srcs+'相.png',
			'shi1':srcs+'仕.png',
			'shuai1':srcs+'帅.png',
			'pao1':srcs+'炮.png',
			'zu1':srcs+'兵.png',

			'ju2':srcs+'车 (1).png',
			'ma2':srcs+'马 (1).png',
			'xiang2':srcs+'象.png',
			'shi2':srcs+'士.png',
			'shuai2':srcs+'将.png',
			'pao2':srcs+'炮 (1).png',
			'zu2':srcs+'卒.png',

			'shadow':srcs+'阴影.png',
			'chi':srcs+'吃.png',
			'jiang':srcs+'将军.png',
			'win':srcs+'胜利.png',
			'lose':srcs+'遗憾.png',
			'btn':srcs+'确定.png',
			'beginGameTxt':srcs+'beginGameTxt.png',
			'beginGame':srcs+'beginGame.png'
		},function(){
			//console.log('游戏加载完成');

			/**/
			chess.createSpr('bg',{
				type:1,
				img:chess.img.bg

			});
			method.loadingGame();

			chess.createSpr('ju1',{type:1,img:chess.img.ju1,x:-100,y:-100,zindex:50});
			chess.createSpr('ma1',{type:1,img:chess.img.ma1,x:-100,y:-100,zindex:50});
			chess.createSpr('xiang1',{type:1,img:chess.img.xiang1,x:-100,y:-100,zindex:50});
			chess.createSpr('shi1',{type:1,img:chess.img.shi1,x:-100,y:-100,zindex:50});
			chess.createSpr('shuai1',{type:1,img:chess.img.shuai1,x:-100,y:-100,zindex:50});
			chess.createSpr('pao1',{type:1,img:chess.img.pao1,x:-100,y:-100,zindex:50});
			chess.createSpr('zu1',{type:1,img:chess.img.zu1,x:-100,y:-100,zindex:50});
			chess.createSpr('ju1_2',{type:1,img:chess.img.ju1,x:-100,y:-100,zindex:50});
			chess.createSpr('ma1_2',{type:1,img:chess.img.ma1,x:-100,y:-100,zindex:50});
			chess.createSpr('xiang1_2',{type:1,img:chess.img.xiang1,x:-100,y:-100,zindex:50});
			chess.createSpr('shi1_2',{type:1,img:chess.img.shi1,x:-100,y:-100,zindex:50});
			chess.createSpr('pao1_2',{type:1,img:chess.img.pao1,x:-100,y:-100,zindex:50});
			chess.createSpr('zu1_2',{type:1,img:chess.img.zu1,x:-100,y:-100,zindex:50});
			chess.createSpr('zu1_3',{type:1,img:chess.img.zu1,x:-100,y:-100,zindex:50});
			chess.createSpr('zu1_4',{type:1,img:chess.img.zu1,x:-100,y:-100,zindex:50});
			chess.createSpr('zu1_5',{type:1,img:chess.img.zu1,x:-100,y:-100,zindex:50});


			chess.createSpr('ju2',{type:1,img:chess.img.ju2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('ma2',{type:1,img:chess.img.ma2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('xiang2',{type:1,img:chess.img.xiang2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('shi2',{type:1,img:chess.img.shi2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('shuai2',{type:1,img:chess.img.shuai2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('pao2',{type:1,img:chess.img.pao2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('zu2',{type:1,img:chess.img.zu2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('ju2_2',{type:1,img:chess.img.ju2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('ma2_2',{type:1,img:chess.img.ma2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('xiang2_2',{type:1,img:chess.img.xiang2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('shi2_2',{type:1,img:chess.img.shi2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('pao2_2',{type:1,img:chess.img.pao2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('zu2_2',{type:1,img:chess.img.zu2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('zu2_3',{type:1,img:chess.img.zu2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('zu2_4',{type:1,img:chess.img.zu2,x:-100,y:-100,zindex:50,enemy:1});
			chess.createSpr('zu2_5',{type:1,img:chess.img.zu2,x:-100,y:-100,zindex:50,enemy:1});


			// readyBtn.onclick=function(){
			// 	this.style.display='none';
			// 	cancelReadyBtn.style.display='inline-block';
			// 	server.ready();
			// }

			// cancelReadyBtn.onclick=function(){
			// 	this.style.display='none';
			// 	readyBtn.style.display='inline-block';
			// 	server.ready();
			// }

			chess.startDraw();

		})
	},
	initTable:function(){
		chess.removeSpr(chess.spr.beginGameBox);
		chess.removeSpr(chess.spr.beginGameTxt);
		chess.removeSpr(chess.spr.load_bg);
		var pieces_keys=Object.keys(initP);
		for(var i=0;i<pieces_keys.length;i++){
			var key=pieces_keys[i];
			chess.spr[key].x=initP[key].x*40+20;
			chess.spr[key].y=(9-initP[key].y)*40+22.5;
			//chess.createSpr(key+'_shadow',{type:1,img:chess.img.shadow,x:chess.spr[key].x,y:chess.spr[key].y,zindex:40})
			chess.createSpr(key+'_shadow',{img:chess.img.shadow,type:1,x:chess.spr[key].x,y:chess.spr[key].y,zindex:10});
		}



		method.bindEvent();

	},
	moveRuler:function(spr){
		if(!spr)
			return [];
		var names=[
			['ju1','ju1_2'],
			['ma1','ma1_2'],
			['xiang1','xiang1_2'],
			['shi1','shi1_2'],
			['shuai1'],
			['pao1','pao1_2'],
			['zu1','zu1_2','zu1_3','zu1_4','zu1_5']
		]

		var xx=(spr.startx-20)/40;
		var yy=(spr.starty-22.5)/40;

		
		var index=-1;
		for(var i=0;i<names.length;i++){
			if(names[i].indexOf(spr.name)>-1){
				index=i;
				break;
			}
		}

		var point=[];
			var enemyPoint=[];
			var enemyName={};
			var yourPoint=[];

			function test_piece(_xx,_yy){
				var now=_xx+'-'+_yy;
				//console.log(now+'  ==  '+(enemyPoint.indexOf(now)>-1) + ' --  '+(yourPoint.indexOf(now)>-1));
				//console.log('友军:')
				//console.log(yourPoint);
				if(yourPoint.indexOf(now)>-1){
					return true;
				}else if(enemyPoint.indexOf(now)>-1){
					console.log(enemyName[_xx+'-'+_yy]);
					point.push({x:_xx,y:_yy,eat:true,danger:enemyName[_xx+'-'+_yy]=='shuai2'});
					return true;
				}else{
					point.push({x:_xx,y:_yy});
				}
				return false;
			}

			switch(index){
				case 0:
					for(var i=0;i<Object.keys(chess.spr).length;i++){
						var key=Object.keys(chess.spr)[i];
						if(key.indexOf('_shadow')>-1)
							continue;
						//console.log(chess.spr[key].x+'=='+spr.startx+' || '+chess.spr[key].y+'=='+spr.starty)
						if(chess.spr[key].x==spr.startx || chess.spr[key].y==spr.starty){
							var _spr=chess.spr[key];
							var _xx=(_spr.x-20)/40;
							var _yy=(_spr.y-22.5)/40;
							if(_spr.enemy){
								enemyPoint.push(_xx+'-'+_yy);
								enemyName[_xx+'-'+_yy]=key;
							}
							else{
								yourPoint.push(_xx+'-'+_yy);
							}
						}
					}
					for(var i=xx+1;i<9;i++){
						if(test_piece(i,yy))
							break;
					}

					for(var i=xx-1;i>-1;i--){
						if(test_piece(i,yy))
							break;
					}

					for(var i=yy+1;i<10;i++){
						if(test_piece(xx,i))
							break;
					}

					for(var i=yy-1;i>-1;i--){
						if(test_piece(xx,i))
							break;
					}
					break;
				case 1:
					for(var i=0;i<Object.keys(chess.spr).length;i++){
						var key=Object.keys(chess.spr)[i];
						if(key.indexOf('_shadow')>-1)
							continue;
						if(chess.spr[key].x!=spr.startx && chess.spr[key].y!=spr.starty){
							var _spr=chess.spr[key];
							var _xx=(_spr.x-20)/40;
							var _yy=(_spr.y-22.5)/40;
							if(Math.abs(_xx-xx)+Math.abs(_yy-yy)==3){
								if(_spr.enemy){
									enemyPoint.push(_xx+'-'+_yy);
									enemyName[_xx+'-'+_yy]=key;
								}
								else
									yourPoint.push(_xx+'-'+_yy);
							}
						}else if((chess.spr[key].x==spr.startx || chess.spr[key].y==chess.spr[key].y) && Math.abs(chess.spr[key].x-spr.startx)<50 && Math.abs(chess.spr[key].y-spr.starty)<50){
							var _spr=chess.spr[key];
							var _xx=(_spr.x-20)/40;
							var _yy=(_spr.y-22.5)/40;
							yourPoint.push(_xx+'-'+_yy);
						}
					}

					if(xx-1>0 && yourPoint.indexOf(xx-1+'-'+yy)<0){
						test_piece(xx-2,yy-1);
						test_piece(xx-2,yy+1);
					}

					if(xx+1<8 && yourPoint.indexOf(xx+1+'-'+yy)<0){
						test_piece(xx+2,yy-1);
						test_piece(xx+2,yy+1);
					}

					if(yy-1>0 && yourPoint.indexOf(xx+'-'+(yy-1))<0){
						test_piece(xx-1,yy-2);
						test_piece(xx+1,yy-2);
					}

					if(yy+1<9 && yourPoint.indexOf(xx+'-'+(yy+1))<0){
						test_piece(xx+1,yy+2);
						test_piece(xx-1,yy+2);
					}

					break;
				case 2:
					for(var i=0;i<Object.keys(chess.spr).length;i++){
						var key=Object.keys(chess.spr)[i];
						if(key.indexOf('_shadow')>-1)
							continue;
						if(chess.spr[key].x!=spr.startx && chess.spr[key].y!=spr.starty){
							var _spr=chess.spr[key];
							var _xx=(_spr.x-20)/40;
							var _yy=(_spr.y-22.5)/40;
							if(Math.abs(_xx-xx)==2 && Math.abs(_yy-yy)==2){
								if(_spr.enemy){
									enemyPoint.push(_xx+'-'+_yy);
									enemyName[_xx+'-'+_yy]=key;
								}
								else
									yourPoint.push(_xx+'-'+_yy);
							}else if(Math.abs(_xx-xx)==1 && Math.abs(_yy-yy)==1){
								yourPoint.push(_xx+'-'+_yy);
							}
						}
					}

					if(xx-1>0 && yy-1>5 && yourPoint.indexOf(xx-1,yy-1)<0){
						test_piece(xx-2,yy-2);
					}
					if(xx-1>0 && yy+1<9 && yourPoint.indexOf(xx-1,yy+1)<0){
						test_piece(xx-2,yy+2);
					}
					if(xx+1<8 && yy-1>5 && yourPoint.indexOf(xx+1,yy-1)<0){
						test_piece(xx+2,yy-2);
					}
					if(xx+1<8 && yy+1<9 && yourPoint.indexOf(xx+1,yy+1)<0){
						test_piece(xx+2,yy+2);
					}
					break;
				case 3:
					for(var i=0;i<Object.keys(chess.spr).length;i++){
						var key=Object.keys(chess.spr)[i];
						if(key.indexOf('_shadow')>-1)
							continue;
						var _spr=chess.spr[key];
						var _xx=(_spr.x-20)/40;
						var _yy=(_spr.y-22.5)/40;
						if(Math.abs(_xx-xx)==1 && Math.abs(_yy-yy)==1){
								if(_spr.enemy){
									enemyPoint.push(_xx+'-'+_yy);
									enemyName[_xx+'-'+_yy]=key;
								}
								else
									yourPoint.push(_xx+'-'+_yy);
						}
					}

					if(xx>3 && yy>7){
						test_piece(xx-1,yy-1);
					}
					if(xx>3 && yy<9){
						test_piece(xx-1,yy+1);
					}
					if(xx<5 && yy>7){
						test_piece(xx+1,yy-1);
					}
					if(xx<5 && yy<9){
						test_piece(xx+1,yy+1);
					}
					break;
				case 4:
					for(var i=0;i<Object.keys(chess.spr).length;i++){
						var key=Object.keys(chess.spr)[i];
						if(key.indexOf('_shadow')>-1)
							continue;
						//console.log(chess.spr[key].x+'=='+spr.startx+' || '+chess.spr[key].y+'=='+spr.starty)
						if(chess.spr[key].x==spr.startx || chess.spr[key].y==spr.starty){
							var _spr=chess.spr[key];
							var _xx=(_spr.x-20)/40;
							var _yy=(_spr.y-22.5)/40;
							if(Math.abs(_xx-xx)==1 || Math.abs(_yy-yy)==1)
							if(_spr.enemy){
								enemyPoint.push(_xx+'-'+_yy);
								enemyName[_xx+'-'+_yy]=key;
							}
							else
								yourPoint.push(_xx+'-'+_yy);
						}
					}
					if(xx>3)
						test_piece(xx-1,yy);
					if(xx<5)
						test_piece(xx+1,yy);
					if(yy>7)
						test_piece(xx,yy-1);
					if(yy<9)
						test_piece(xx,yy+1);
					break;
				case 5:
					for(var i=0;i<Object.keys(chess.spr).length;i++){
						var key=Object.keys(chess.spr)[i];
						if(key.indexOf('_shadow')>-1)
							continue;
						//console.log(chess.spr[key].x+'=='+spr.startx+' || '+chess.spr[key].y+'=='+spr.starty)
						if(chess.spr[key].x==spr.startx || chess.spr[key].y==spr.starty){
							var _spr=chess.spr[key];
							var _xx=(_spr.x-20)/40;
							var _yy=(_spr.y-22.5)/40;
							if(_spr.enemy){
								enemyPoint.push(_xx+'-'+_yy);
								enemyName[_xx+'-'+_yy]=key;
							}
							yourPoint.push(_xx+'-'+_yy);
						}
					}
					var em=false;	
					for(var i=xx+1;i<9;i++){

						if(!em){
							if(test_piece(i,yy))
								em=true;
						}else{
							if(enemyPoint.indexOf(i+'-'+yy)>-1){
								//console.log(enemyName[i+'-'+yy])
								point.push({x:i,y:yy,eat:true,danger:enemyName[i+'-'+yy]=='shuai2'});
								break;
							}
						}
					}
					em=false;
					for(var i=xx-1;i>-1;i--){
						if(!em){
							if(test_piece(i,yy))
								em=true;
						}else{
							if(enemyPoint.indexOf(i+'-'+yy)>-1){
								//console.log(enemyName[i+'-'+yy])
								
								point.push({x:i,y:yy,eat:true,danger:enemyName[i+'-'+yy]=='shuai2'});
								break;
							}
						}
					}
					em=false;
					for(var i=yy+1;i<10;i++){
						if(!em){
							if(test_piece(xx,i))
								em=true;
						}else{
							if(enemyPoint.indexOf(xx+'-'+i)>-1){
								//console.log(enemyName[xx+'-'+i])
								point.push({x:xx,y:i,eat:true,danger:enemyName[xx+'-'+i]=='shuai2'});
								break;
							}
							
						}
					}
					em=false;
					for(var i=yy-1;i>-1;i--){
						if(!em){
							if(test_piece(xx,i))
								em=true;
						}else{
							if(enemyPoint.indexOf(xx+'-'+i)>-1){
								point.push({x:xx,y:i,eat:true,danger:enemyName[xx+'-'+i]=='shuai2'});
								
								break;
							}
						}
					}
					break;
				case 6:
					for(var i=0;i<Object.keys(chess.spr).length;i++){
						var key=Object.keys(chess.spr)[i];
						if(key.indexOf('_shadow')>-1)
							continue;
						//console.log(chess.spr[key].x+'=='+spr.startx+' || '+chess.spr[key].y+'=='+spr.starty)
						if(chess.spr[key].x==spr.startx || chess.spr[key].y==spr.starty){
							var _spr=chess.spr[key];
							var _xx=(_spr.x-20)/40;
							var _yy=(_spr.y-22.5)/40;
							if(Math.abs(_xx-xx)==1 || Math.abs(_yy-yy)==1)
							if(_spr.enemy){
								enemyPoint.push(_xx+'-'+_yy);
								enemyName[_xx+'-'+_yy]=key;
							}
							else
								yourPoint.push(_xx+'-'+_yy);
						}
					}
					if(xx>0 && yy<5)
						test_piece(xx-1,yy);
					if(xx<8 && yy<5)
						test_piece(xx+1,yy);
					if(yy>0)
						test_piece(xx,yy-1);
					break;
			}

		return point;

	},
	enemyMove:function(obj){
		var piece=obj.piece;
		if(piece.indexOf('_')>-1){
			piece=piece.replace('1_','2_');
		}else{
			piece=piece.replace('1','2');
		}
		var spr=chess.spr[piece];
		spr.startx=spr.x;
		spr.starty=spr.y;
		spr.movex=obj.x*40+20;
		spr.movey=(9-obj.y)*40+22.5;
		spr.timeIndex=0;
		spr.event=function(){
			if(this.timeIndex<10){
				this.y-=2;
				this.w-=0.1;
				this.h-=0.1;
			}else if(this.timeIndex<20){

			}else if(this.timeIndex<30){
				this.x+=(this.movex-this.startx)/10;
				this.y+=(this.movey-this.starty)/10;
				//console.log(this.name);
				chess.spr[this.name+'_shadow'].x+=(this.movex-this.startx)/10;
				chess.spr[this.name+'_shadow'].y+=(this.movey-this.starty)/10;
			}else if(this.timeIndex<40){

			}else if(this.timeIndex<40){
				this.y+=2;
				this.w-=0.1;
				this.h-=0.1;
			}else{
				chess.spr[this.name+'_shadow'].x=this.x=this.startx=this.movex;
				chess.spr[this.name+'_shadow'].y=this.y=this.starty=this.movey;
				this.w=35;
				this.h=35;
				var iseat=false;
				for(var k=0;k<Object.keys(chess.spr).length;k++){
					var key=Object.keys(chess.spr)[k];
					if(!chess.spr[key].enemy && chess.spr[key].x==this.movex && chess.spr[key].y==this.movey){
						if(key.indexOf('_shadow')>-1 && chess.spr[key.replace('_shadow','')].enemy){
							
							continue;
						}
						if(key=='shuai1'){
							//alert('你输了');
							method.matchOver(false);
							delete this.event;
							return;
						}else{
							iseat=true;
							chess.removeSpr(chess.spr[key]);
							chess.removeSpr(chess.spr[key+'_shadow']);
							chess.createSpr('eat',{type:1,img:chess.img.chi,zindex:99});
							chess.spr.eat.event=function(){
								if(this.timeIndex>50){
									chess.removeSpr(this);
									if(obj.danger){
										chess.createSpr('danger',{type:1,img:chess.img.jiang,zindex:99})
										chess.spr.danger.event=function(){
											if(this.timeIndex>60){
												chess.removeSpr(this);
											}
										}
									}
								}
							}
						}
					}
				}
				if(obj.danger && !iseat){
					chess.createSpr('danger',{type:1,img:chess.img.jiang,zindex:99})
					chess.spr.danger.event=function(){
						if(this.timeIndex>60){
							chess.removeSpr(this);
						}
					}
				}

				method.stepIndex++;



				delete this.event;
				
			}

		}
	},
	bindEvent:function(){

		//chess.spr.shi1.click=lift;
		//chess.spr.shi1.startx=chess.spr.shi1.x;
		//chess.spr.shi1.starty=chess.spr.shi1.y;
		var names=[
				['ju1','ju1_2'],
				['ma1','ma1_2'],
				['xiang1','xiang1_2'],
				['shi1','shi1_2'],
				['shuai1'],
				['pao1','pao1_2'],
				['zu1','zu1_2','zu1_3','zu1_4','zu1_5']
		]

		for(var i=0;i<names.length;i++){
			for(var j=0;j<names[i].length;j++){
				var __spr=chess.spr[names[i][j]];
				__spr.click=lift;
				__spr.startx=__spr.x;
				__spr.starty=__spr.y;
			}
		}

		function lift(){
			if(method.gameover)
				return;
			if(method.choosePiece==this.name)
				return;

			if(method.stepIndex%2!=(server.getRound()-1)){
				return;
			}
			if(method.movePoints.length>0){
				for(var j=0;j<method.movePoints.length;j++){
					chess.removeSpr(chess.spr[method.movePoints[j]]);
				}
			}
			method.movePoints=[];
			
			if(method.choosePiece){
				var old_piece=chess.spr[method.choosePiece];
				old_piece.timeIndex=0;
				old_piece.event=function(){
					if(this.timeIndex<10){
						this.y+=2;
						this.w-=0.1;
						this.h-=0.1;
					}
				}
			}
			this.timeIndex=0;
			moveChoose(this);
			method.choosePiece=this.name;
			this.event=function(){
				if(this.timeIndex<10){
					this.y-=2;
					this.w+=0.1;
					this.h+=0.1;
				}else{
					//this.startx=this.x;
					//this.starty=this.y;
				}

				


			}
		}
		function moveChoose(spr){

			var point=method.moveRuler(spr);

			
			method.movePoints=[];

			for(var i=0;i<point.length;i++){
				var key='point_'+i;
				method.movePoints.push(key);
				var _xx=point[i].x*40+20;
				var _yy=point[i].y*40+22.5;

				//console.log(_xx+'-'+_yy)
				chess.createSpr(key,{type:3,x:_xx,y:_yy,w:5,h:5,bcolor:'#9ACD32',lcolor:'#9ACD32',zindex:1});
			}
			chess.click.chessMove=function(scope,x,y){
				for(var i=0;i<method.movePoints.length;i++){
					var p=chess.spr[method.movePoints[i]];
					if(x>p.x-15 && x<p.x+15 && y>p.y-15 && y<p.y+15){
						var _spr=chess.spr[method.choosePiece];
						_spr.zindex=99;
						chess.changeZIndex(_spr);
						_spr.timeIndex=0;
						_spr.startx=_spr.x;
						_spr.starty=_spr.y;

						for(var k=0;k<Object.keys(chess.spr).length;k++){
							var key=Object.keys(chess.spr)[k];
							if(chess.spr[key].enemy && chess.spr[key].x==p.x && chess.spr[key].y==p.y){
								if(key=='shuai2'){
									method.matchOver(true);		
								}else{
									chess.removeSpr(chess.spr[key]);
									chess.removeSpr(chess.spr[key+'_shadow']);
									chess.createSpr('eat',{type:1,img:chess.img.chi,zindex:99});
									chess.spr.eat.event=function(){
										if(this.timeIndex>30){
											chess.removeSpr(this);
										}
									}
								}
							}
						}


						for(var j=0;j<method.movePoints.length;j++){
							chess.removeSpr(chess.spr[method.movePoints[j]]);
						}
						method.movePoints=[];
						_spr.event=function(){
							if(this.timeIndex<11){
								var ux=(p.x-_spr.startx)/10;
								var uy=(p.y-spr.starty-22)/10;
								_spr.x+=ux;
								_spr.y+=uy;
								chess.spr[_spr.name+'_shadow'].x+=ux;
								chess.spr[_spr.name+'_shadow'].y+=uy;
							}else if(this.timeIndex<30){
							}else if(this.timeIndex<40){
								_spr.y+=2;
								_spr.w-=0.1;
								_spr.h-=0.1;
							}else{
								chess.spr[_spr.name+'_shadow'].x=_spr.x=_spr.startx=p.x;
								chess.spr[_spr.name+'_shadow'].y=_spr.y=_spr.starty=p.y;
								_spr.w=35;
								_spr.h=35;

								var isdanger=false;
								for(var j=0;j<names.length;j++){
									for(var k=0;k<names[j].length;k++){
										var __spr=chess.spr[names[j][k]];
										if(!__spr)
											continue;
										var pointsList=method.moveRuler(__spr);
										for(var l=0;l<pointsList.length;l++){
											if(pointsList[l].danger){
												isdanger=true;
												break;
											}
										}
										if(isdanger)
											break;
									}
									if(isdanger)
										break;
								}
								if(isdanger){
									chess.createSpr('danger',{img:chess.img.jiang,type:1,zindex:99})
									chess.spr.danger.event=function(){
										if(this.timeIndex>60){
											chess.removeSpr(this);
										}
									}
									console.log('敌人被将军');
								}

								method.moveObject={
									id:method.stepIndex,
									name:'',
									piece:_spr.name,
									x:parseInt((p.x-20)/40),
									y:parseInt((p.y-22.5)/40),
									danger:isdanger
								}

								method.stepIndex++;

								server.sendStep();


								delete this.event;
								
							}
						}

						method.choosePiece='';
						delete chess.click.chessMove;
						break;

					}
				}

			}
		}

	}
}


var _CHESS=function(dom){
	var obj={
        dom:document.querySelector(dom),
		index:0,
        cav:null,
        c:null,
        isRun:false,
        frames:0,
        mid:{
            x:0,
            y:0
        },
        z_index:{},
		img:{},
		spr:{},
        click:{},
		init:function(){
            var scope=this;
			this.cav=this.dom;
            this.c=this.cav.getContext('2d');
            this.mid={x:this.cav.width/2,y:this.cav.height/2};
            this.cav.onclick=function(){
                //console.log(event.offsetX+' '+event.offsetY);
                var cx=event.offsetX,cy=event.offsetY;
                for(var i=0;i<Object.keys(scope.spr).length;i++){
                    var key=Object.keys(scope.spr)[i];
                    if(!scope.spr[key].click){
                        continue;
                    }else{
                        var spr=scope.spr[key];
                        if(spr.type==1 || spr.type==3){
                            if(spr.x-spr.w/2<=cx && spr.x+spr.w/2>=cx && spr.y-spr.h/2<=cy && spr.y+spr.h/2>=cy){
                                scope.spr[key].click();
                                break;
                            }
                        }
                    }
                }

                if(Object.keys(scope.click).length>0){
                    var keys=Object.keys(scope.click);
                    for(var i=0;i<keys.length;i++){
                        (scope.click[keys[i]])(scope,cx,cy);
                    }
                }
            }


		},
		createSpr:function(name,opt){
            if(opt.type==1){
                if(!opt.w)
                    opt.w=opt.img.width/2;
                if(!opt.h)
                    opt.h=opt.img.height/2;
            }
			this.spr[name]={
                /*分类:1:图片，2：文字，3：矩形，4，环形或原型*/
                type:opt.type,
                name:name,
                /*坐标*/
                x:opt.x?opt.x:this.mid.x,
                y:opt.y?opt.y:this.mid.y,

                /*图片参数*/
                img:opt.img?opt.img:'',
                w:opt.w?opt.w:100,
                h:opt.h?opt.h:100,
                /*文字参数*/
                text:opt.text?opt.text:'',
                size:opt.size?opt.size:0,
                align:opt.align?opt.align:'center',

                


                /*环形参数*/
                /*外圈的半径*/
                r:40,
                /*内圈的半径*/
                r2:35,
                /*环形起始角,1:90℃*/
                sa:1,
                /*环形结束角*/
                ea:1,

                
                /*背景颜色*/
                bcolor:opt.bcolor?opt.bcolor:'#FF0000',
                /*描边颜色*/
                lcolor:opt.lcolor?opt.lcolor:'#FF0000',
                timeIndex:0,
                timeAll:0,


                enemy:opt.enemy?opt.enemy:0,

                zindex:(opt.zindex?opt.zindex:Object.keys(this.spr).length),
                event:function(){

                }
            }
            if(this.z_index[this.spr[name].zindex]){
                this.z_index[this.spr[name].zindex]+=','+name;
            }else{
                this.z_index[this.spr[name].zindex]=name;
            }

		},
        removeSpr:function(spr){
            if(!spr)
                return;
            var name=spr.name;

            for(var i=0;i<Object.keys(this.z_index).length;i++){
                var list=this.z_index[Object.keys(this.z_index)[i]].split(',');
                var index=list.indexOf(name);
                if(index>-1){
                    list.splice(index,1);
                    if(list.length>0)
                        this.z_index[Object.keys(this.z_index)[i]]=list.join(',');
                    else 
                        delete this.z_index[Object.keys(this.z_index)[i]];
                    break;
                }
            }
            //console.log(this.z_index)
            delete this.spr[name];

        },
        changeZIndex:function(spr){
            var name=spr.name;
            for(var i=0;i<Object.keys(this.z_index).length;i++){
                var list=this.z_index[Object.keys(this.z_index)[i]].split(',');
                var index=list.indexOf(name);
                if(index>-1){
                    list.splice(index,1);
                    //console.log(list);
                    if(list.length>0)
                        this.z_index[Object.keys(this.z_index)[i]]=list.join(',');
                    else 
                        delete this.z_index[Object.keys(this.z_index)[i]];
                    break;
                }
            }
            if(this.z_index[this.spr[name].zindex]){
                this.z_index[this.spr[name].zindex]+=','+name;
            }else{
                this.z_index[this.spr[name].zindex]=name;
            }
        },
		startDraw:function(){
            this.isRun=true;
			requestAnimationFrame(this.draw.bind(this));
		},
		stopDraw:function(){

		},
		loadImageAll:function(imgObj,callback){
			var keys=Object.keys(imgObj);
			var index=0;
			var t=this;
			function loadImage(){
				var src=imgObj[keys[index]];
				var name=keys[index]
				var img=new Image();
				img.src=src;
				img.onload=function(){
					t.img[name]=this;
					if(keys.length<=index+1){
						if(callback)
							callback();
						return;
					}else{
						index++;
						loadImage();
					}
				}
			}

			loadImage();
			
		},
		drawSpr:function(spr){
            //1:img,2:txt,3:rect,4:arc
            switch(spr.type){
                case 1:
                    this.image(spr);
                    break;
                case 2:
                    this.text(spr);
                    break;
                case 3:
                    this.rect(spr);
                    return;
                case 4:
                    this.arc(spr);
                    break;

            }
        },
        image:function(spr){
            //console.log(spr);
            this.c.drawImage(spr.img,spr.x-spr.w/2,spr.y-spr.h/2,spr.w,spr.h);
        },
        text:function(spr){
            this.c.font=spr.size+'px Arial';
            this.c.textAlign='center';
            if(spr.align)
                this.c.textAlign=spr.align;
            this.c.fillStyle=spr.lcolor;
            this.c.fillText(spr.text,spr.x,spr.y);
        },
        arc:function(spr){
            this.c.strokeStyle=spr.lcolor;
            this.c.fillStyle=spr.bcolor;
            if(spr.ea==spr.sa)
                return;
            this.c.arc(spr.x,spr.y,spr.r,spr.sa*Math.PI,spr.ea*Math.PI);
            this.c.arc(spr.x,spr.y,spr.r2,spr.ea*Math.PI,spr.sa*Math.PI,-1);
            this.c.arc(spr.x,spr.y,spr.r,spr.sa*Math.PI,spr.sa*Math.PI);
            this.c.stroke();
            this.c.fill();
            
        },
        rect:function(spr){
            this.c.strokeStyle=spr.lcolor;
            this.c.fillStyle=spr.bcolor;
            if(spr.w<=0 || spr.h<=0)
                return;
            this.c.strokeRect(spr.x-spr.w/2,spr.y-spr.h/2,spr.w,spr.h);
            if(spr.bcolor){
                this.c.fillRect(spr.x-spr.w/2,spr.y-spr.h/2,spr.w,spr.h);
            }
        },
        event:function(){
            /**/
        },
        draw:function(timespan){
            //console.log(this);
            this.frames++;
            //console.log(this);
            if(this.frames%2==0)
                this.c.clearRect(0,0,1000,1000);

            var _spr=[];
            var zlist=Object.keys(this.z_index);
            var sprList=[];
            for(var i=0;i<zlist.length;i++){
                var sprs=this.z_index[zlist[i]].split(',');
                for(var j=0;j<sprs.length;j++){
                    sprList.push(sprs[j]);
                }
            }

            for(var i=0;i<sprList.length;i++){
                var name=sprList[i];
                if(!this.spr[name]){
                    //console.log(name+'已被移除');
                    continue;
                }
                if(this.frames%2==0){
                    this.c.save();
                    this.c.beginPath();
                    if(this.spr[name].rotate){
                        this.c.translate(this.spr[name].x,this.spr[name].y);
                        this.c.rotate(this.spr[name].rotate*Math.PI/180);
                        this.c.translate(-this.spr[name].x,-this.spr[name].y);
                    }
                    this.drawSpr(this.spr[name]);
                    this.c.restore();
                }
                
                if(!this.spr[name].timeIndex)
                    this.spr[name].timeIndex=0;
                if(!this.spr[name].timeAll)
                    this.spr[name].timeAll=0;
                this.spr[name].timeIndex++;
                this.spr[name].timeAll++;
                if(this.spr[name].event)
                    this.spr[name].event();
            }
            if(this.isRun)
                //return;
                requestAnimationFrame(this.draw.bind(this));
        }
    }

	
	obj.init();
	return obj;
}









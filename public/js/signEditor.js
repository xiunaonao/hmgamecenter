var vapp=new Vue({
	el:"#sign",
	data:{
		signForm:[],
		signTitle:'',
		signDesc:'',
		sysid:signData.id,
		sysid:0,
		edit_index:-1,
		loading:false,
		saveOpen:false,
		loading_txt:'',
		isFontMove:false,
	},
	directives:{
	},
	methods:{
		show_editor:function(obj,ind){
			console.log(obj);
			if(this.edit_index!=-1){
				this.signForm[this.edit_index].is_edit=0;
			}
			obj.name=obj.name+"";
			obj.is_edit=1;
			this.edit_index=ind;

		},
		cancelChoose:function(){
			this.signForm[this.edit_index].is_edit=0;
			this.edit_index=-1;
		},
		signForm_add:function(){
			if(this.edit_index>-1)
				this.signForm[this.edit_index].is_edit=0;

			this.signForm.push(
				{
					type:1,
					name:'',
					context:'',
					valid:1,
					option:'',
					notnull:0,
					is_edit:1,
					style:this.initStyle()
					
				}
			)
			this.edit_index=this.signForm.length-1;
		},
		signForm_del:function(){
			this.signForm.splice(this.edit_index,1);
			this.edit_index=-1;
		},
		upload_img:function(obj,$event){
			var fd=new FormData();
			var scope=this;
			fd.append('files',$event.target.files[0]);
			scope.loading=true;
			scope.loading_txt='文件正在上传';
			axios.post('/api/upload',fd).then(function(data){
				scope.loading=false;
				if(data.data.success){
					scope.signForm[scope.edit_index].src=data.data.url;


				}

			});
		},
		signMoveStart:function(name,event){
			this.isFontMove=true;
			this.moveName=name;
			var dom=this.signForm[this.edit_index];
			var moveX=parseFloat(dom.style[name]);
			this.moveX=(event.touches[0].clientX)-moveX*deviceFontSize;
		},
		signMove:function(name,event){
			
			if(this.isFontMove && name==this.moveName){
				var dom=this.signForm[this.edit_index];
				var v=(event.changedTouches[0].clientX-this.moveX)/deviceFontSize;
				if(v>0 && v<1.65){
					dom.style[name]=v+'rem';
					if(name=="fontsize")
						if(dom.context.length*(v+0.02)<3.75 && v<0.38)
							dom.style["line-height"]=0.38+'rem';
						else
							dom.style["line-height"]=v+0.02+'rem';
					if(name=="margin-top"){
						dom.style["margin-bottom"]=v+'rem';
					}
				}
			}
		},
		signMoveEnd:function(name,event){
			this.isFontMove=false;
			this.moveName="";
		},
		initStyle:function(obj){
			return {
				"color":'#333',
				"text-align":"center",
				"font-size":"0.13rem",
				"line-height":"0.4rem",
				"margin-top":"0rem",
				"margin-bottom":"0rem",
			}
		}
	},
	mounted:function(){
		if(signData.rows)
			for(var i=0;i<signData.rows.length;i++){
				signData.rows[i].is_edit=0;
				if(!signData.rows[i].valid)
					signData.rows[i].valid=0;
				if(!signData.rows[i].notnull)
					signData.rows[i].notnull=0;
				if(!signData.row[i].style){
					signData.rows[i].style=this.initStyle();

					;
				}
				this.signForm.push(signData.rows[i]);
			}
	}
});
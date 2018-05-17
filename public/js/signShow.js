var vapp=new Vue({
	el:"#sign",
	data:{
		sysalert:false,
		sysalerttxt:'提交成功',
		sysid:signData.id,
		signForm:signData.rows,
		signUrl:'/api/form_submit',
		isValid:false,
		isSuccess:false
	},
	methods:{
		postCode:function(){
			for(var i=0;i<this.signForm.length;i++){
				if(this.signForm[i].name=="手机" || this.signForm[i].name=="联系方式"){
					if(!this.signForm[i].value)
						return;

					break;
				}
			}
		},
		changeSelect:function(obj){
			obj.value="";
		},
		submitForm:function(){
			var t=this;
			if(this.isSuccess)
			{
				this.sysalerttxt="请不要重复提交";
				this.sysalert=true;
				window.setTimeout(function(){
					t.sysalert=false;
				},3000)
				return;
			}
			var formObj={
				sysid:this.sysid,
				rows:{},
				types:{}
			};

			for(var i=0;i<this.signForm.length;i++){
				console.log(this.signForm[i].name);
				formObj.rows[this.signForm[i].name]=this.signForm[i].value?this.signForm[i].value:'';
				formObj.types[this.signForm[i].name]=this.signForm[i].type;
			}
			//this.$http.post(this.signUrl,formObj).then(function(data){
			axios.post(this.signUrl,formObj).then(function(data){
				if(typeof data.data=='string')
					data.data=JSON.parse(data.data);
				if(data.data.success==1){
					t.isSuccess=true;
					t.sysalerttxt="提交成功";
					t.sysalert=true;
				}
				window.setTimeout(function(){
					t.sysalert=false;
				},3000)
			});
		}

	},
	mounted:function(){
		for(var i=0;i<this.signForm.length;i++){
			if(this.signForm[i].type==3){
				this.signForm[i].value="";
			}
		}
	}
});
var vapp=new Vue({
	el:"#sign",
	data:{
		sysid:signData.id,
		signForm:signData.rows,
		signUrl:'/api/form_submit',
		isValid:false
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
			var formObj={
				sysid:this.sysid,
				rows:{}
			};

			for(var i=0;i<this.signForm.length;i++){
				console.log(this.signForm[i].name);
				formObj.rows[this.signForm[i].name]=this.signForm[i].value?this.signForm[i].value:'';
			}

			this.$http.post(this.signUrl,formObj).then(function(data){

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
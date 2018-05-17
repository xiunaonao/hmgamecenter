var vapp=new Vue({
	el:"#sign",
	data:{
		sysid:sysid,
		signData:[],
		signUrl:'/api/form_data?id=',
		isValid:false
		//widthList:[0,0,0,0],
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

			
		},
		getData:function(){
			var t=this;
			axios.get(this.signUrl+this.sysid).then(function(data){
					t.signData=data.data.data;
			})
		}

	},
	mounted:function(){
		this.getData()
		//this.totalWidth();
	}
});
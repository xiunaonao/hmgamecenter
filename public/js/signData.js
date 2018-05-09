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
			this.$http.get(this.signUrl+this.sysid).then(function(data){
				if(typeof data.data == 'string')
					data.data=JSON.parse(data.data);
					this.signData=data.data.data;
			});
		}
		// totalWidth:function(){
		// 	for(var i=0;i<this.signData.length;i++){
		// 		var keys=Object.keys(this.signData[i].rows);
		// 		for(var j=0;j<keys.length;j++){
		// 			var width=(this.signData[i].rows[keys[j]]).length;
		// 			if(this.widthList.length<j+1 || this.widthList[j]<width ){
		// 				this.widthList[j]=width;
		// 			}
		// 		}
		// 	}
		// }

	},
	mounted:function(){
		this.getData()
		//this.totalWidth();
	}
});
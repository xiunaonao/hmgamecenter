var vapp=new Vue({
	el:"#sign",
	data:{
		signForm:[],
		sysid:signData.id,
		sysid:0,
		edit_index:-1
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

		}
	},
	mounted:function(){
		if(signData.rows)
			for(var i=0;i<signData.rows.length;i++){
				signData.rows[i].is_edit=0;
				this.signForm.push(signData.rows[i]);
			}
	}
});
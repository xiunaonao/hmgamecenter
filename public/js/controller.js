
var chess={template:`
	<div>
	
	</div>


	`,
	data:function(){
		return {
			name:""
		}
	}	
	,
	mounted:function(){
		
	}
};






var routes=[
	{ path: '/chess', component: chess },
]


var router=new VueRouter({
	routes:routes
});

var app=new Vue({
	router:router
}).$mount('#index');
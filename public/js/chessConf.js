/*象棋*/

var chessComponent=[
	{
		path:"/chess",
		title:"中国象棋",
		template:"/gameServer/chess",
		controller:"chess"

	}

];



for(var i=0;i<chessComponent.length;i++){
	routes.push(controller.bind(chessComponent[i]));
}
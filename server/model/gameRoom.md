

gameAttackInfo 比赛过程表
===

#字段名
	* id id
	* name 名称(预留)
	* start_date 开始时间
	* end_date 结束时间
	* game_id 所属游戏的id
	* match_id 所属比赛的id
	* status 状态 0：未开始，准备中，1：双方准备完毕，游戏进行中，2：胜负已分，游戏结束
	* players 正在房间的玩家（数组）
		* id 玩家id
		* name 玩家昵称
		* head 玩家头像
		* type 1:主场，2：客场 3、观众
		* status 状态 0：未开始 1：未准备，2：已准备 3：已开始 4：已完赛
	* step 游戏进程（数组，玩家每下一步生成一条记录）
		* id 进程id
		* name 称呼 (如：马二进三)
		* player 操作玩家id 1：红方 2：黑方
		* piece 操作棋子 1-9:车 2-8：马 3-7：象 4-6：士 5：帅 10-11：炮 12-13-14-15-16：卒
		* x 平移动到位置（0-8）
		* y 进退移动到未知（0-9）
	* winplayer 胜利玩家id


#初始化
 	{
 		"id":1,
 		"name":"",
 		"state_date":new Date(),
 		"end_date":null,
 		"game_id":1,
 		"match_id":0,
 		"status":0,
 		"players":[
 			{
 				"id":"",
 				"name":"",
 				"head":"",
 				"type":1,
 				"status":1
 			}
 		],
 		"step":[
 			{
 				"id":1,
 				"name":"",
 				"player":1,
 				"piece":12,
 				"x":0,
 				"y":4
 			}
 		],
 		"winplayer":0
 	}
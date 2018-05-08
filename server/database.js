var mongo=require('mongodb').MongoClient;
var url='mongodb://localhost:27017/hm_db';

const _db=()=>{
	var obj= {
		connect:(database,callback)=>{
			if(!database)
				database='hm_db';
			mongo.connect(url,(err,db)=>{
				var dbo=db.db(database);
				callback(err,dbo,db);
			});
		},
		query:(table,where,callback,database)=>{
			obj.connect(database,(err,dbo,db)=>{
				if(err){
					callback(err,result);
					return;
				}
				dbo.collection(table).find(where).toArray((err2,result)=>{
					if(err2){
						callback(err2,result);
						return;
					}
					callback(err2,result);
					db.close();
				})
			});
		},
		insert:(table,rows,callback,database)=>{
			obj.connect(database,(err,dbo,db)=>{
				if(err){
					callback(err,result);
					return;
				}
				dbo.collection(table).insertMany(rows,(err2,res)=>{
					if(err2){
						callback(err2,result);
						return;
					}
					console.log(res);
					callback(err2,res);
					db.close();
				});
			});
		},
		update:(table,rows,where,callback,database)=>{
			obj.connect(database,(err,dbo,db)=>{
				if(err){
					callback(err,result);
					return;
				}
				let updateStr = {$set: rows};
				dbo.collection(table).updateMany(updateStr,(err2,res)=>{
					if(err2){
						callback(err2,result);
						return;
					}
					console.log(res);
					callback(res);
					db.close();
				});
			});
		}
	}

	return obj;
}


module.exports=_db()
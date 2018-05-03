let express=require('express');
let router=express.Router();

router.get('/chess',(req,res,next)=>{
	res.render('chess/index',{});
});

module.exports=router;
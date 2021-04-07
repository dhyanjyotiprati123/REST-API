const jwt=require("jsonwebtoken");
const User=require("../DB/model");

const Auth=async(req,res,next)=>{
   const token=req.cookies.jwt;
   const verifyUser=jwt.verify(token, process.env.KEY);
   const user=await User.findOne({_id: verifyUser._id})
   req.token=token;
   req.user=user;
   next();
}

module.exports=Auth;
const jwt =require("jsonwebtoken");
const userModel= require("../models/user-models");

module.exports=async(req,res,next)=>{
  
    if(!req.cookies.token){
        req.flash("error","you need to login first ");
        return res.redirect("/login");
    }


try {
    let decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY);
    let user=await userModel.findOne({email:decoded.email}).select("-password"); // select use to select particular data form upcomeing data and here -password mean we don't want password
    req.user=user;
    next();
} catch (error) {
    res.flash("error","something went wrong");
    res.redirect("/login");
}  ;
}
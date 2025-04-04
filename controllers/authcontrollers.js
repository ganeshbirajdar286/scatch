const bcrypt =require("bcrypt");
const userModel=require("../models/user-models");
const cookieParser= require("cookie-parser");
const {generatorToken}= require("../utils/generateToken")

module.exports.registerUser=async(req,res)=>{
  try {
    let {fullname,email,password}=req.body;
   let user=await userModel.findOne({email});
   if(user) {
    req.flash("registerispresent","user already  exits");
    res.redirect("/login");
   }else{
    bcrypt.genSalt(12,(err,salt)=>{
      bcrypt.hash(password,salt,async(err,hash)=>{
       if(err) return res.send(err.message);
       else{
        let user=await userModel.create({
          fullname,
          email,
          password:hash,
        });
          let token= generatorToken(user);
          res.cookie("token",token);
          res.redirect("/login/shop");
       }
      })
    })
   }
  } catch (error) {
    res.send(error.message);
  }
};
module.exports.loginUser=async(req,res)=>{
  try {
    let {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(!user) {
      req.flash("loginusers","Email or password incorrect");
      res.redirect("/login");
    }
    bcrypt.compare(password,user.password,(err,result)=>{
       if(result){
        let token=generatorToken(user);
        res.cookie("token",token);
        res.redirect("/login/shop");
       }else{
        return res.send("Email or password incorrect");
       }
    })
  } catch (error) {
     console.log(error.message);
     
  }
} ;
module.exports.logout=(req,res)=>{
 res.cookie("token","");
 res.redirect("/login");

};
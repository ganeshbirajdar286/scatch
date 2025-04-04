const jwt =require("jsonwebtoken");

 const generatorToken=(user)=>{
    return token=jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY);
}

  module.exports={generatorToken};
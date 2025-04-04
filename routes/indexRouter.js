const express= require("express");
const isLoggedIn=require("../middleware/isLoggedIn");
const ProductModule = require("../models/product-models");
const userModule = require("../models/user-models");
const router = express.Router();
router.get("/",(req,res)=>{
    let error=req.flash("error");
    let error1=req.flash("registerispresent");
    let error2=req.flash("loginusers");
    res.render("index",{error,error1,error2});
});
router.get("/shop",isLoggedIn,async(req,res)=>{
    let products= await ProductModule.find({});
    let success = req.flash("success");
    res.render("shop",{products,success});
});
router.get("/cart",isLoggedIn,async(req,res)=>{
    let user =await userModule.findOne({email:req.user.email}).populate("cart");
    let bill = (Number(user.cart[0].price)+20)-Number(user.cart[0].discount);
    res.render("cart",{user,bill});
});
router.get("/addtocart/:productId",isLoggedIn,async(req,res)=>{
   let user= await userModule.findOne({email:req.user.email});
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success","Added To Cart");
    res.redirect("/login/shop");
});

module.exports=router;
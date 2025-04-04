const express= require("express");
const router = express.Router();
const ownerModel = require("../models/owner-models");
router.get("/",(req,res)=>{
    res.send("owner");
});
router.post("/create",async(req,res)=>{
  let owner=await ownerModel.find();
  if(owner.length>0) return res.status(503).send("you don't have permission to create a  new  owner");
  let {fullname,email,password}=req.body;
 let createOwner= await ownerModel.create({
    fullname,
    email,
    password,
  });
  res.status(201).send(createOwner);
});
router.get("/admin",(req,res)=>{
  let success =req.flash("success")
  res.render("createproducts",{success});
})
module.exports=router;
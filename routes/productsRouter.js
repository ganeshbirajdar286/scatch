const express= require("express");
const upload =require("../config/multer-config");
const  productsModel =require("../models/product-models");
const router = express.Router();
router.get("/",(req,res)=>{
    res.send("product");
});
router.post("/create",upload.single("image"),async(req,res)=>{
    try {
        let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
    let product  =await productsModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    })
    
        req.flash("success","product created succesfully");
        res.redirect("/owners/admin");
    } catch (error) {
        res.send(error.message);
    }
})
module.exports=router;
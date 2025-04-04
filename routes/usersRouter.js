const express= require("express");
const {registerUser,loginUser,logout}  = require("../controllers/authcontrollers")
require("dotenv").config();

const router = express.Router();
router.get("/",(req,res)=>{
    res.send("user");
});
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logout);

module.exports=router;
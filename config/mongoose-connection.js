const mongoose =require("mongoose");
const config= require("config");

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(()=> console.log("connected to  mongodb "))
.catch((err)=> console.log("ERR !!!!:",err));


module.exports=mongoose.connection;  // If you need to access the database connection in multiple files.
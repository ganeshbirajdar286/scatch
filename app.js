require("dotenv").config();  
const express=require("express");
const path =require("path");
const cookieParser =require("cookie-parser");
const db = require("./config/mongoose-connection");
const usersRouter =require("./routes/usersRouter");
const productsRouter=require("./routes/productsRouter");
const ownersRouter =require("./routes/ownersRouter");
const loginRouter = require("./routes/indexRouter");
const  expressSession= require("express-session");
const flash =require("connect-flash");
const app =express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser()); 
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.use("/owners",ownersRouter);
app.use("/login",loginRouter); 

app.get("/",(req,res)=>{
    res.send("hello")
})
app.listen(port,(req,res)=>{ 
    console.log(`server is working on ${port}`);
    
});  
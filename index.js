const express=require("express");
const path=require("path");
const cookieparser=require("cookie-parser");
const {connectmongodb}=require("./connect");
const URL=require("./models/url");
const app=express();
const PORT=8001;
const { restrict_to_login_users_only,checkauth }=require("./middleware/auth")

const urlroute=require("./routes/url");
const static_router=require("./routes/static_routes")
const userroute=require("./routes/user");


//mongo coonnected
connectmongodb('mongodb://127.0.0.1:27017/url-shortener')
.then(()=>{
    console.log("mongodb connected")
})


//view engine
app.set("view engine","ejs");
app.set('views',path.resolve('./views'))


//middleware
app.use(express.json());    //parse json data
app.use(express.urlencoded({extended:false}))  //parse form data
app.use(cookieparser())  

app.use("/",checkauth,static_router);
app.use("/url",restrict_to_login_users_only,urlroute);
app.use("/user",userroute);


app.get("/url/:shortid",async(req,res)=>{
    const shortid=req.params.shortid;
    const entry=await URL.findOneAndUpdate({
        shortid
    },
    {
        $push:{
            visit_history:{timestamp:Date.now()},
        },
    })
    res.redirect(entry.redirect_url);
});

app.get('/analytics/:shortid',urlroute);

app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`);
});
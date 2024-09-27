const user = require("../models/user");
const {v4: uuidv4}=require("uuid");
const {setuser}=require("../service/auth");

async function handleusersignup(req,res){
    const {name,email,password}=req.body;
    await user.create({
        name,email,password
    });
    return res.redirect("/");
};
async function handleuserlogin(req,res){
    const {email,password}=req.body;
    const User=await user.findOne({
        email,password
    });
    if(!User) return res.render("login",{
        error: "invalid email or password",
    })

    // const sessionid=uuidv4();
   const token= setuser(User);
    res.cookie('uid',token)
    return res.redirect("/");
};

module.exports={
    handleusersignup,
    handleuserlogin,
}
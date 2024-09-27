const  {getuser}=require("../service/auth");

async function restrict_to_login_users_only(req,res,next){
    const userid=req.cookies.uid;

    if(!userid) return res.redirect("/login");
    const user=getuser(userid);
    if(!user){
        return res.redirect("/login")
    }
    req.user=user;
    next();
}


async function checkauth(req,res,next){
    const userid=req.cookies.uid;
    const user=await getuser(userid);
    req.user=user;
    next();
}


module.exports={
    restrict_to_login_users_only,
    checkauth
}
const jwt=require("jsonwebtoken");
const secret="djikstra@987";
// const sessionidtousermap=new Map();

function setuser(user){
    // sessionidtousermap.set(id,user);
    const token=jwt.sign({
        _id:user.id,
        email:user.email,
    },secret);
    console.log("token:" ,token);
    return token;
}



function getuser(token){
    try{
        return jwt.verify(token, secret);

    }catch(error){
        return null;
    }

}
module.exports={
    setuser,
    getuser,
}
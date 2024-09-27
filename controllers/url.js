const shortid=require("shortid");
const URL=require("../models/url");//url is model

async function generate_url(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required"});

    const short_id=shortid.generate();
    await URL.create({
        shortid:short_id,
        redirect_url:body.url,
        visit_history:[],
        createdby:req.user.id
    });
    return res.render('home',{
        id:short_id,
    })
}

async function getanalytics(req,res){
    const shortid=req.params.shortid;
    const result=await URL.findOne({shortid});
    return res.json({totalclicks:result.visit_history.length,analytics:result.visit_history})
}
module.exports={
    generate_url,
    getanalytics
}
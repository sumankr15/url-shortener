const express=require("express");
const {generate_url,getanalytics}=require("../controllers/url");
const router=express.Router();

router.post('/',generate_url);
router.get('/analytics/:shortid',getanalytics);
module.exports=router;
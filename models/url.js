const mongoose=require("mongoose");

const urlschema=new mongoose.Schema({
    shortid:{
        type:String,
        required:true,
        unique:true,
    },
    redirect_url:{
        type:String,
        required:true,
    },
    visit_history:[{timestamp:{
        type:Number
    }}],
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }

},
{timestamps:true}
); 

const URL=mongoose.model('url',urlschema);

module.exports=URL;
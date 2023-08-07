const mongoose=require('mongoose');


const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"titel is required"],
    },
    description:{
        type:String,
        required:[true,"description is required"],
    },
    image:{
        type:String,
        required:[true,"image is required"],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"user id is requird"]
    }

},{timestamps:true});

const blogModel=mongoose.model('Blog',blogSchema);
module.exports=blogModel;
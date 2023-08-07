const mongoose =require('mongoose');


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"User name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"]
        
    },
    password:{
        type:String,
        required:[true,"Password is requird"]
    },
    blogs:[
    {
        type:mongoose.Types.ObjectId,
        ref:"Blog",
    }
    ]
},{timestamps:true})

const userModel =mongoose.model('User',userSchema);

module.exports=userModel;
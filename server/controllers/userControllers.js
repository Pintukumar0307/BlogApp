const userModel=require('../models/userModel');
const bcrypt =require('bcrypt');

// Register
exports.register= async(req,res)=>{
    try {
        const {username,email,password}=req.body;

        // validation
        if(!username|| !email|| !password){
            return res.status(400).send({
                succuss:false,
                message:"Please Fill all fields"
            })
        }

        // exisiting user
        const exisitingUser = await userModel.findOne({email});
        if(exisitingUser){
            return res.status(401).send({
                succuss:false,
                message:"User already registered",

            })
        }
        const hashpassword=await bcrypt.hash(password,10);

        // save new user
        const user =new userModel({username,email,password:hashpassword});

        await user.save();

        return res.status(201).send({
            succuss:true,
            message:"User registered successfully",
            user
        })

        
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message:"Error in register",
            succuss:false,
            error
        })
        
    }
};

// Get all Users
exports.getAllUsers=async(req,res)=>{
    try {
        const users= await userModel.find({});
        return res.status(200).send({
            usercount:users.length,
            succuss:true,
            message:"User Get successfully",
            users
        })

        
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            message:"Error in getallusers",
            succuss:false,
            error
        })
        
    }

};



// Login
exports.login= async(req,res)=>{

    try {
        const {email,password}=req.body;

        // validation
        if(!email || !password){
            return res.status(401).send({
                succuss:false,
                message:"Please Fill all fields"
            });
        }
        const user=await userModel.findOne({email});

        if(!user){
            return res.status(201).send({
                succuss:false,
                message:"Email is not registered",
            })
        }

        // password cheeck
        const ismatch= await bcrypt.compare(password,user.password);

        if(!ismatch){
            return res.status(401).send({
                success:false,
                message:"Password does not match",
               
            })
        }

        return res.status(200).send({
            success:true,
            message:"login successfully",
            user
        })
        
        
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            message:"Error in login",
            succuss:false,
            error
        })
    }

};

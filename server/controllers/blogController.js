const mongoose = require('mongoose');
const blogModel=require('../models/blogModel');
const userModel = require('../models/userModel');


exports.getAllBlogs=async(req,res)=>{
    try {
        const blogs=await blogModel.find({}).populate('user');

        if(!blogs){
            return res.status(200).send({
                 success:false,
                 message:"No blog found",
            })
        }

        return res.status(200).send({
            success:true,
            blogscount:blogs.length,
            message:"all blog found list",
            blogs
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success:false,
            message:"Error getting all blog",
            error
        })
    }

}

exports.createBlog= async(req,res)=>{
   try {
    const {title,description,image,user}=req.body;

    if(!title || !description || !image || !user){
        return res.status(500).send({
            success:false,
            message:"Please fill all fiels",
        })
    }
    const exisitingUser= await userModel.findById(user);

    if(!exisitingUser){
        return res.status(404).send({
            success:false,
            message:"unable to find user"
        })
    }

    const newBlog=new blogModel({title,description,image,user});
    const session=await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({session});
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({session});
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
         success:true,
         message:"Successfully Blog created!",
         newBlog,
    })
    
   } catch (error) {
    console.log(error);
    return res.status(400).send({
        success:false,
        message:"Error creating blog",
        error,
    })
   }
}

// Update Blog
exports.updateBlog=async(req,res)=>{
    
  try {
    const {id}=req.params;
    const {title,description,image}=req.body;

    const blog = await blogModel.findByIdAndUpdate(
        id,
        {...req.body},
        {new:true});

     console.log(blog);
    return res.status(201).send({
        success:true,
        message:"Successfully blog updated",
        blog
   })
    
  } catch (error) {
    console.error(error);
    return res.status(500).send({
        success:false,
        message:"Error updating blog",
        error
    })
  }
}

// Delete blog
exports.deleteBlog=async(req,res)=>{
    
    try {
    
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog);
        await blog.user.save()

        return res.status(200).send({
            success:true,
            message:"blog delete successfully",
           
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error delete blog",
            error
        })
    }

}

// get single blog
exports.getBlogById=async(req,res)=>{
    try {
        const {id} =req.params;
        const blog=await blogModel.findById(id);

        if(!blog){
            return res.status(404).send({
                success:false,
                message:"Blog not found",
            })
        }
        return res.status(200).send({
            success:true,
            message:"blog found",
            blog
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error delete blog",
            error
        })
    }
}


// user blog

exports.userBlog=async(req,res)=>{
    try {
        const userblogs=await userModel.findById(req.params.id).populate("blogs");
        if(!userblogs){
            return res.status(404).send({
                success:false,
                message:"user blog not found"
            })
        }
        return res.status(200).send({
            success:true,
            message:"User blog get successfully",
            userblogs
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error in user blog",
            error
        })
    }

}
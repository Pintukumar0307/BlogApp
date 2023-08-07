const express =require('express');
const { getAllBlogs, createBlog, updateBlog, deleteBlog, getBlogById, userBlog } = require('../controllers/blogController');

const router=express.Router();

//routes

//get all blogs
router.get('/all-blog',getAllBlogs);

//create Blog
router.post('/create-blog',createBlog);

//update blog
router.put('/update-blog/:id',updateBlog);

//delete blog
router.delete('/delete-blog/:id',deleteBlog);

// get single blog
router.get('/single-blog/:id',getBlogById);

// get user blog
router.get('/user-blog/:id',userBlog);

module.exports=router;


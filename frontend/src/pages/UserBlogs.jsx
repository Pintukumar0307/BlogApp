import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogCard from '../components/BlogCard';


const UserBlogs = () => {
  const [blogs,setBlogs]=useState([]);
  const [name,SetName]=useState('');

  // get all user blog
   const getAllBlogs = async()=>{
    try {
      const id= localStorage.getItem('userId');
  
      const {data}=await axios.get(`/api/v1/blog/user-blog/${id}`);
      if(data?.success){
        setBlogs(data?.userblogs.blogs);
        SetName(data?.userblogs.username);
      }
      
    } catch (error) {
      console.log(error);
    }
   }

   useEffect(()=>{
          getAllBlogs();
   },[])

      

  return (
    <div>
   
    {blogs && blogs.map( (blog) => 

    <BlogCard
         key={blog._id}
         id={blog._id}
         isUser={true}
         title={blog.title}
         description={blog.description}
         image={blog.image}
         username={name}
         time={blog.createdAt}
         />
    // <>
    //  <h1>{blog.title}</h1>
    //   <h1>{name}</h1>
    // </>
    )}


  </div>
  )
}

export default UserBlogs
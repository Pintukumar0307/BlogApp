import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Register from './pages/Register'

import CreateBlog from './pages/CreateBlog'
import UserBlogs from './pages/UserBlogs'
import BlogDetails from './pages/BlogDetails'
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Header/>
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs/>}></Route>
        <Route path="/blogs" element={<Blogs/>}></Route>
        <Route path="/myblogs" element={<UserBlogs/>}></Route>
        <Route path="/createblog" element={<CreateBlog/>}></Route>
        <Route path='/blogdetails/:id' element={<BlogDetails/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="register" element={<Register/>}></Route>
      </Routes>
      
    </Router>
  )
}

export default App

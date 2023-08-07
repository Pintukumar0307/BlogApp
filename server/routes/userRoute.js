const express=require('express');
const { getAllUsers, register, login } = require('../controllers/userControllers');

const router=express.Router();

// Get all users
router.get('/all-users',getAllUsers);

// Register
router.post('/register',register);

// login
router.post('/login',login);

module.exports=router;
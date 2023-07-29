const express = require('express');
const { signin, signup, protectRoute, logout,login } = require('../controllers/authController');
const { getTeam, addTeam, deleteTeam, getAllusers } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.route('/login')
    .get(protectRoute,login)

userRouter.route('/signin')
    .post(signin)

userRouter.route('/signup')
    .post(signup)

userRouter.route('/logout')
    .get(logout)

userRouter.route('/team')
    .get(protectRoute, getTeam)
    .post(protectRoute, addTeam)
    
userRouter.route('/teams/:id')
    .delete(protectRoute, deleteTeam)
    
userRouter.route('/all')
    .get(getAllusers)

module.exports = userRouter;;
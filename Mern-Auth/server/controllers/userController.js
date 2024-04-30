const asyncHandler = require('express-async-handler')
const User = require('../model/User.model')
const generateToken = require('../utils/generateToken')

// @desc Auth user/set token
// @route POST /users/auth
// @access Public
const authUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body
    
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password)))
    {
        console.log('user id', user._id)
        generateToken(res, user._id)
        res.status(200).json({
            name: user.name,
            email: user.email,
            password: user.password
        })
    }
    else
    {
        res.status(404).json({message: 'Invalid email or password'})
    }
})

// @desc Register new user
// @route POST /users/register
// @access Public
const registerUser = asyncHandler(async (req,res)=>{
    const {name, email, password} = req.body
    // check if the user is already exist in db or not
    const userExist = await User.findOne({email})
    if(userExist)
    {
        return res.status(404).json({message: 'this user is already exist in the database'})
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(!user)
    {
        return res.status(404).json({message: "invalid user data"})
    }
    generateToken(res, user._id)
    res.status(200).json({
        name: user.name,
        email: user.email,
        password: user.password
    })
})

// @desc Logout user
// @route POST /users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res)=>{
    res.cookie('jwtToken', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "User Logged out"})
})

// @desc Get user profile
// @route GET users/userProfile
// @access Private
const getUserProfile = asyncHandler(async (req, res)=>{
    console.log(req.user)
   res.status(200).json({
        "id": req.user._id,
        "name": req.user.name,
        "email": req.user.email 
    })
})

// @desc Update user profile
// @route PUT /users/updateUserProfile
// @access Private
const updateUserProfile = asyncHandler(async (req, res)=>{
    const {name, email, password} = req.body
    const user = await User.findById(req.user._id)
    if(user)
    {
        user.name = name || user.name 
        user.email = email || user.email
        user.password = password || user.password

        await user.save()
        res.status(200).json({
            "name": user.name,
            "email": user.email,
            "password": user.password 
        })
    }

    else
    {
        res.status(404).json({message: 'error '})
    }
})



module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}
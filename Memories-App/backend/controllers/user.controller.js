const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async(req, res)=>{
    console.log(req.body)
    const{email, password} = req.body
    // Check in the db that the user is existing 
    try
    {
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(404).json({message: 'User not found'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) 
        {
            return res.status(404).json({message: 'Invalid mail or password'})
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1d'})
        console.log(token)
        res.status(200).json({token})
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message: 'Internal server error'})
    }
}

const registerUser = async(req, res)=>{
    const {userName, email, password} = req.body 
    // Hashing password before register it in the database
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)
    const newUser = new User({
        userName: userName,
        email: email,
        password: hashedPassword  
    })
    if(newUser)
    {
        try
        {
            const registeredUser = await newUser.save()
            if(!registeredUser) return res.status(404).json({message: 'User cannot registered'})
            res.status(200).json(registeredUser) 
        }
        catch(err)
        {
            console.error(err)
            res.status(500).json({message: 'Internal message error'})
        }
    
    }

}

module.exports = {registerUser, loginUser}
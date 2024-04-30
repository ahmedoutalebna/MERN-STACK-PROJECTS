const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/User.model')

const protect = asyncHandler(async(req, res, next)=>{
    let token
    token = req.cookies.jwtToken
    if(token)
    {
        try
        {
            // verify if the token is valid
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next() 
        }
        catch(err)
        {
            throw new Error('Not Authorized, invalid token')
        }
    }
    else
    {
        res.status(401).json({message: 'Not Authorized, no token'})
    }
    console.log(req.cookies.jwt)

})

module.exports = protect
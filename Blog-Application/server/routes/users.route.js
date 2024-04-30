const {User} = require('../models/user.model.js')
const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt')

// Get user 
userRouter.get('/getUser/:id', async(req, res)=>{
    try
    {
        const userId = req.params.id
        const user = await User.findById(userId)

        if(user)
        {
            const {password, ...others} = user._doc
            res.status(200).json(others)
        }
        else
        {
            res.status(404).json({message: 'User not found'})
        }
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message: err.message})
    }
})
// update user by id
userRouter.put('/updateUser/:id', async(req, res)=>{
    const userId = req.params.id
    console.log(userId)
    console.log(req.body)
    if(userId === req.body.userId)
    {
        if(req.body.password)
        {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt) 
        }
        try
        {
            const user = await User.findByIdAndUpdate(userId, req.body)
            if (user) {
                // Successfully updated
                res.json({ message: 'User updated successfully' });
            } else {
                // User not found
                res.status(404).json({ message: 'User not found' });
            }        }
        catch(err)
        {
            console.error(err)
            res.status(500).json({message: err.message})
        }
    }

    else
    {
        res.status(404).json({message: 'You can update only your user account'})
    }
})
// delete user by id
userRouter.delete('/deleteUser/:id', async(req, res)=>{
    const userId = req.params.id
    console.log('request object: ', req.params.id)
    console.log('user id: ', userId)
    try
    {
        console.log(req.params)
        const user = await User.findByIdAndDelete(userId)
        if(user)
        {
            res.status(200).json({message: 'User deleted successfully'})
        }   
        else
        {
            res.status(404).json({message: 'user not found'})
        }
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message: 'Internal server error'})
    }
})
module.exports = userRouter
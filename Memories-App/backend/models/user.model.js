const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    userName:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        unique: true,
        required: true 
    },
    password:{
        type: String,
        required: true 
    }
})

const User = mongoose.model('User', userModel)
module.exports = User 
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: "",
    }
},
    {
        timestamps: true 
    }
)
const User = mongoose.model('User', userSchema)

module.exports = {User}
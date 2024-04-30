const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    category:
    {
        type: String
    },
    author:
    {
        type: String,
        required: true 
    },
    postedAt:
    {
        type: String 
    },
    content:
    {
        type: String,
        required: true 
    },
    postImageSource:
    {
        type: String, 
        required: true 
    }
}, )

const Post = mongoose.model('Post', postSchema)

module.exports = Post 

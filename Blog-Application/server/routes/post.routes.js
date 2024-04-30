const express = require('express')
const router = express.Router()
const {getAllPosts, getPostById, createPost, updatePost, deletePost} = require('../controllers/post.controllers')
// Get all posts
router.get('/posts', getAllPosts)
// Get Post by id
router.get('/post/:postId', getPostById)
// Create a post 
router.post('/createPost', createPost)
// Update post 
router.put('/post/:postId', updatePost)
// Delete post by id
router.delete('/deletePost/:postId', deletePost)

module.exports = router 

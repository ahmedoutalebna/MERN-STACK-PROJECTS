const Post = require('../models/post.model')

// Get all posts 
const getAllPosts = async(req, res)=>{
    try
    {
        const post = await Post.find()
        if(!post)
        {
            return res.status(404).json({message: "Post not found"})
        }
        res.status(200).json(post)

    }
    catch(err)
    {
        res.status(500).json({message: err.message})
        console.error(err)
    }
}
// get post by id
const getPostById = async(req, res)=>{
    const {postId} = req.params 
    try
    {
        const post = await Post.findById(postId)
        if(!post)
        {
            return res.status(404).json({message: "Post not found"})
        }
        res.status(200).json(post)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
        console.error(err)
    }
}
// create a post 
const createPost = async(req, res)=>{
    const requestedPost = req.body
    const post = new Post(requestedPost)
    try
    {
        // const post = await Post.create(requestedPost)
        const savedPost = await post.save()
        if(!savedPost)
        {
            return res.status(404).json({message: err.message})
        }
        res.status(200).json(savedPost)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
        console.error(err)
    }
}
// Update a post
const updatePost = async (req, res) => {
    const { postId } = req.params;
    const updatedPostData = req.body;
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true }); // Add { new: true } option
      console.log(updatedPost)
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.error(err);
    }
  };
  
// delete post by id
const deletePost = async(req, res)=>{
    const {postId} = req.params
    console.log('post id: ', postId)
    try
    {
        const deletedPost = await Post.findByIdAndDelete(postId)
        if(!deletedPost)
        {
            return res.status(404).json({message: "Post not found"})
        }
        res.status(200).json(deletedPost)

    }
    catch(err)
    {
        res.status(500).json({message: err.message})
        console.error(err)
    }
}
module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}

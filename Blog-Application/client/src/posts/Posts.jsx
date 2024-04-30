import React, { useState, useEffect} from 'react'
import './posts.css'
import { cardData } from './post-card/cardData'
import Postcard from './post-card/Postcard'
import './post-card/postcard.css'
import SinglePost from '../singlePosts/SinglePost'
import Navbar from '../navbar/Navbar'
import { useNavigate, useLocation } from 'react-router-dom'


const Posts = () => {
  const[posts, setPosts] = useState([])
  const[postId, setPostId] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  let ph = 'http://localhost:5000/images/'
  useEffect(() => {
    getAllPosts()
    console.log(location)
  }, [])

  const getAllPosts = async()=>{
    try
    {
      const response = await fetch('http://localhost:5000/posts')
      const data = await response.json()
      setPosts(data)
    }
    catch(err)
    {
      console.error(err)
    }
  }

  const handlePost = (postId)=>{
    navigate(`/post/${postId}`)

    setPostId(postId)

  }
  return (
    <div className='posts-container'>            
        {
          posts.map((item, index)=>(
          
            <div className='post-card-container' onClick={()=> handlePost(item._id)}>
              <img src={ph + item.postImageSource}/>
              <h2 className='title'>{item.title}</h2>
              <span className='category'>{item.category}</span>
              <span className='time'>{item.postedAt}</span>
              <span className='text'>
                {item.content}
              </span>
            </div>  
          ))     
        }
    </div>
  )
}

export default Posts
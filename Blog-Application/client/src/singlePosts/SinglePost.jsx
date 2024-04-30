import React, { useEffect, useState, useContext } from 'react'
import './singlePost.css'
import Navbar from '../navbar/Navbar.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import { useParams } from 'react-router-dom'
import { Context } from '../context/Context.jsx'
import axios from 'axios'; // Import axios for handling HTTP requests

const SinglePost = () => {
  const [info, setInfo] = useState()
  const { postId } = useParams()
  const { user } = useContext(Context)
  const [updateMode, setUpdateMode] = useState(false)
  const [contentPost, setContentPost] = useState('')
  const [titlePost, setTitlePost] = useState('')

  let ph = 'http://localhost:5000/images/'

  useEffect(() => {
    if (postId) {
      getPostById(postId)
    }
  }, [postId])
  
  useEffect(() => {
    if (info) {
      setTitlePost(info.title)
      setContentPost(info.content)
    }
  }, [info])
  

  // Define handleUpdatePost function
  const handleUpdatePost = async () => {
    try {        
        await axios.put('http://localhost:5000/post/' + postId, {
          title: titlePost,
          content: contentPost
        })
        setUpdateMode(false)

      } catch (err) {
        console.error(err)
      }
    
  }


  // Define handleDeletePost function
  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post")
    if(confirmDelete)
    {
      try {
        const res = await axios.delete('http://localhost:5000/deletePost/' + postId) // Corrected URL format
        if (res.data) {
          window.location.replace('/')
          alert('The post is deleted successfully')
        }
      } catch (err) {
        console.error(err)
      }
    }

  }


  // Define getPostById function
  const getPostById = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:5000/post/${postId}`)
      setInfo(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="single-post-container">
      <Navbar />
      <div className="content">
        {
          info &&
          <div className='content-single-post'>
            <img src={ph + info.postImageSource} alt="" />
            <div className="second">
              {
                info.author === user.userName && (
                  <div className="icons">
                    <i className="fa-solid fa-pencil" style={{ color: "#63E6BE" }} onClick={()=> setUpdateMode(true)}></i>
                    <i className="fa-solid fa-trash" style={{ color: "#63E6BE" }} onClick={handleDeletePost}></i>
                  </div>
                )
              }
              <h2 className='category'>{info.category}</h2>
            </div>
            <div className='third'>
                <span className='title'>{info.author}</span>
                {
                  updateMode ?
                  (
                    <span className='title-input'>
                      <input type="text" value={titlePost} onChange={(e)=> setTitlePost(e.target.value)} />
                    </span>
                  )
                  :
                  (
                    <span className='title'>{titlePost}</span>
                  )
                }
                <span className='title'>{info.postedAt}</span>
              </div>
            {
              updateMode ? 
              (
                <span className='paragraph-input'>
                  <textarea type="text" value={contentPost} onChange={(e)=> setContentPost(e.target.value)}/>
                </span>
              )
              :
              (
                <span className='paragraph'>
                  {contentPost}
                </span> 
              )
            }
            {
              updateMode && (
                <div className='button-update'>
                  <button className='updatePost' onClick={handleUpdatePost}>Update the post</button>
                </div>
              )
            }

          </div>
        }

        <Sidebar />
      </div>
    </div>
  )
}

export default SinglePost

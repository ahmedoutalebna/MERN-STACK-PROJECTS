import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './css/addCss.css'
const AddBook = () => {
  const[title, setTitle] = useState('')
  const[author, setAuthor] = useState('')
  const[publishDate, setPublishDate] = useState('')
  const[imageSource, setImageSource] = useState('')
  const[description, setDescription] = useState('')
  const navigate = useNavigate()
  const data = {
    Title: title,
    Author: author,
    PublishDate: publishDate,
    Description: description,
    ImageSource: imageSource 
  }
  const handleSubmit = async()=>{
      try
      {
        const response = await fetch("http://localhost:5500/books",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        if(response.ok)
        {
          alert('Data added successfully')
        }
        else
        {
          alert('Failed to add data')
        }
      }
      catch(err)
      {
        console.error(message.err)
      }
  }
  const handleBackHome = ()=>{
    navigate('/')
  }
  

  return (
    <div className='add-container'>
      <h1><FontAwesomeIcon icon={faArrowLeft} className='left-arrow' onClick={handleBackHome}/></h1>
      <div class="form">
        <div class="title">Add book</div>
        <div class="input-container ic1">
          <input id="title" class="input" type="text" placeholder=" " onChange={(e)=> setTitle(e.target.value)}/>
          <div class="cut"></div>
          <label htmlFor="title" class="placeholder">Title</label>
        </div>
        <div class="input-container ic2">
          <input id="author" class="input" type="text" placeholder=" " onChange={(e)=> setAuthor(e.target.value)}/>
          <div class="cut"></div>
          <label htmlFor="author" class="placeholder">Author</label>
        </div>
        <div class="input-container ic2">
          <input id="date" class="input" type="date" placeholder=" " onChange={(e)=> setPublishDate(e.target.value)}/>
          <div class="cut cut-short"></div>
          <label htmlFor="date" class="placeholder">Publish date</label>
        </div>
        <div class="input-container ic2">
          <input id="image-source" class="input" type="text" placeholder=" " onChange={(e)=> setImageSource(e.target.value)}/>
          <div class="cut cut-short"></div>
          <label htmlFor="image-source" class="placeholder">Image Source</label>
        </div>
        <div class="input-container ic2">
          <input id="description" class="input" type="text" placeholder=" " onChange={(e)=> setDescription(e.target.value)}/>
          <div class="cut cut-short"></div>
          <label htmlFor="description" class="placeholder">Description</label>
        </div>
        <button type="text" class="submit" onClick={handleSubmit}>submit</button>
      </div>
    </div>
  )
}

export default AddBook
import React from 'react'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './css/show.css'
const ShowBook = () => {
    const location = useLocation()
    const bookId = location.state?.bookId; // Use optional chaining
    const navigate = useNavigate()
    const[bookData, setBookData] = useState()
    useEffect(()=>{
        fetchShowBook()
    }, [])

    const fetchShowBook = async()=>{
        let url = `http://localhost:5500/books/${bookId}`
        try
        {
            const data = await fetch(url)
            const response = await data.json()
            setBookData(response)
        }
        catch(err)
        {
            console.error(err)
        }
    }
    const handleBackHome = ()=>{
        navigate('/')
    }

    return(
      <div>
        <h1><FontAwesomeIcon icon={faArrowLeft} className='arrow' onClick={handleBackHome}/></h1>
        <div className="showBook-container">
            <h1>Book details</h1>
            <div className="card-container">
                <h2> Title: {bookData?.Title}</h2>
                <img src={bookData?.ImageSource}/>
                <h3>Author: {bookData?.Author} </h3>
                <p> Description: {bookData?.Description} </p>
                <span>Publish date: {bookData?.PublishDate} </span>
            </div>
        </div>
      </div>

    )
  
}

export default ShowBook
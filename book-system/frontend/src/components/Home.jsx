import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTrash, faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from 'react-router-dom'
import './home.css'
const Home = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    useEffect(()=>{
        fetchBooks()
    }, [])
    const fetchBooks = async()=>{
        try
        {
            const response = await fetch('http://localhost:5500/books')
            const data = await response.json()
            setBooks(data)
            console.log(data)
        }
        catch(err)
        {
            console.error(err)
        }
    }
    const handleShowBook = (bookId)=>{
        navigate('/books/showBook', {state: {bookId: bookId}})
    }
    const handleUpdateBook = (bookId)=>{
        navigate('/books/editBook', {state: {bookId: bookId}})
    }
    const handleDelete = async(bookId)=>{
        let userConfirmed = confirm("Are you sure you want to delete this book")
        if(userConfirmed)
        {
            console.log('user confirmed')
            try
            {
                const deletedBook = await fetch(`http://localhost:5500/books/${bookId}`,{
                    method: "DELETE"
                    
                })
                if(deletedBook.ok)
                {
                    let newBooks = books.filter(book => book._id != bookId)
                    setBooks(newBooks)
                    confirm("Book deleted successfully")
                }
                else
                {
                    confirm("Cannot delete the book")
                }

            }
            catch(err)
            {
                console.error(err)
            }
        }
    }

    return(
        <div className="container">
            <div className="header">
                <h1>Books List</h1>
                <Link to='/books/addBook'>
                    <span><FontAwesomeIcon icon={faPlus}/></span>  
                </Link> 
            </div>
            
            <div className="home-container">
                <table>
                    <tr>
                        <th>No:</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Operations</th>
                    </tr>
                    {
                        books.map((book, item)=>(
                            <tr key={book._id}>
                                <td>{item + 1} </td>
                                <td>{book.Title}</td>
                                <td>{book.Author}</td>
                                <td className='functions'>
                                    <span>
                                        <FontAwesomeIcon icon={faInfo} color='black' onClick={() => handleShowBook(book._id)}/>
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faTrash} color='black'onClick={()=> handleDelete(book._id)}/>
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faEdit} color='black' onClick={()=> handleUpdateBook(book._id)}/>
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>

    )
}

export default Home
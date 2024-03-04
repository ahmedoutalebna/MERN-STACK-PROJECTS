import React from 'react'
import Home from './components/Home'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import ShowBook from './pages/ShowBook'
import {Routes, Route} from 'react-router-dom'
const App = () => {

  return (
    <>
      <Routes>
        <Route path = '/books/addBook' element={<AddBook />}/>
        <Route path = '/' element={<Home />}/>
        <Route path = '/books/editBook' element={<EditBook />}/>
        <Route path = '/books/deleteBook' element={<DeleteBook />}/>
        <Route path = '/books/showBook' element={<ShowBook />}/>
      </Routes>


    </>
  )
}

export default App
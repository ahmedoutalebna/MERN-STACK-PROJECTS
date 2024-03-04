const express = require('express')
const router = express.Router()
// Implementing controllers
const {getAllBooks, getBooksByNames, getBookById, addBooks, updateBook, deleteBook} = require('../controllers/booksController.controller.js')
// Get all books 
router.get('/books', getAllBooks)
router.get('/books/:id', getBookById)
router.get('/books/:title', getBooksByNames)
router.post('/books', addBooks)
router.put('/books/:id', updateBook)
router.delete('/books/:id', deleteBook)
module.exports = router 


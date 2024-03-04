const Book = require('../models/bookModel.model')
const getAllBooks = async(req, res)=>{
    try
    {
        const bk  = await Book.find()
        if(!bk)
        {
            return res.status(404).json({message: "books searched are not found"})
        }
        res.status(200).json(bk)
    
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message: err.message})
    }
}
const getBooksByNames = async(req, res)=>{
    const title = req.params.title 
    try
    {
        const book = await Book.findOne({Title: title})
        console.log('Founded books', book)
        if(!book)
        {
            return res.status(404).json({message: "Book name is not found in database"})
        }
        res.status(200).json(book)
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message: err.message})
    }
}
const getBookById = async(req,res)=>{
    const bookId = req.params.id 
    try
    {
        const book = await Book.findById(bookId)
        console.log('the book ', book)
        if(!book)
        {
            return res.status(404).json({message: 'Cannot find the book'})
        }
        res.status(200).json(book)
    } 
    catch(err)
    {
        console.error(err)
        res.status(500).json({message: err.message})
    }

}
const addBooks = async (req, res) => {
    try {
        const postedData = req.body;
        const book = new Book(postedData);
        const savedBook = await book.save();
        if (!savedBook) {
            return res.status(400).json({ message: "Book creation failed" });
        }
        res.status(201).json(savedBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
        }   
}
const updateBook = async(req, res)=>{
    try
    {
        const bookId = req.params.id 
        const bookData = req.body 
        const updatedData = await Book.findByIdAndUpdate(bookId, bookData)
        if(!updatedData)
        {
            return res.status(404).json({message: 'failed to update this book'})
        }
        res.status(200).json(updatedData)

    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message: 'Internal server error'})
    }
}
const deleteBook = async(req, res)=>{
    const bookId = req.params.id 
    console.log('the book id is: ', bookId)
    try
    {
        const deletedBook = await Book.findByIdAndDelete(bookId)
        if(!deletedBook)
        {
            return res.status(404).json({message: 'Cannot delete this book'})
        }
        res.status(200).json(deletedBook)

    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({message: err.message})
    }
}


module.exports = {getAllBooks, getBooksByNames, getBookById, addBooks, updateBook, deleteBook}
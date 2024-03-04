const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Book = require('./models/bookModel.model.js')
const bookRoutes = require('./routes/booksRoute.route.js')
const cors = require('cors')
app.use(express.json())

app.use(cors())

// Middlewares to set up routes 
app.use('/', bookRoutes)


mongoose.connect("mongodb://localhost:27017/Books")
.then(()=>{
    console.log("Connected to books database")
})
.catch((err)=>{
    console.error(err)
})


app.listen(5500, ()=>{
    console.log("The server is listen at port 5500")
})



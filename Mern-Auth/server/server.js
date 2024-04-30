const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
// Connection to mern authentication database
const {connectDB} = require('./config/db')
// settings port env
require('dotenv').config()
const port = process.env.PORT || 5000
// allowing cors policy
app.use(cors(
    {credentials: true},
))
// importing middlewares
const {notFound, errorHandler} = require('./middlewares/errorMiddlewares')
// Settings router for user authentication
const UserRouter = require('./routes/userRoute')
// Cookie parser
app.use(cookieParser())
// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// users router
app.use('/users', UserRouter)

app.use(notFound)
app.use(errorHandler)


connectDB() 

app.listen(port, ()=>{
    console.log(`the backend is running at the port ${port}`)
})
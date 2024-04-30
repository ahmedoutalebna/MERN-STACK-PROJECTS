const express = require('express')
const app = express()
const mongoose = require('mongoose') 
// const Post = require('./models/post.model')
const router = require('./routes/post.routes')
const authRouter = require('./routes/auth.routes') 
const userRouter = require('./routes/users.route')
const multer = require('multer')
const path = require('path')
const cors  = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use(cors())

app.use('/', router)
app.use('/api', authRouter)
app.use('/userApi', userRouter)
// http://localhost:5000/userApi/authentication


mongoose.connect("mongodb://localhost:27017/BlogDB")
.then(()=>{
    console.log('connected to blog database')
})
.catch((err)=>{
    console.error(err)
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
const upload = multer({storage: storage}) 

app.post('/upload', upload.single('file'), (req, res)=>{
    res.status(200).json("file has been successfully uploaded")
})

app.listen(5000, ()=>{
    console.log('this server is listening in port 5000')
})
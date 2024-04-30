const mongoose = require('mongoose')

const connectDB = async()=>{
    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('connect to Mern Authentication database')
        console.log(conn.connection.host)
    }
    catch
    {
        console.log('Failed to connect to database')
        process.exit(1)
    }
}

// mongoose.connect("mongodb://localhost:27017/BlogDB")
// .then(()=>{
//     console.log('connected to blog database')
// })
// .catch((err)=>{
//     console.error(err)
// })

module.exports = {connectDB}
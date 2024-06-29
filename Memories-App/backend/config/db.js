const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectionDb = async()=>{
    try
    {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to memories db is successfully')
    }
    catch(err)
    {
        console.log('error in db connection', err.message)
        process.exit(1)
    }
}

module.exports = connectionDb 
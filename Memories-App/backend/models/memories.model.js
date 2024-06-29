const mongoose = require('mongoose')

const memoriesModel = new mongoose.Schema({
    creator:{
        type: String,
        required: true  
    },
    title:{
        type: String,
        required: true 
    },
    message:{
        type: String,
        required: true 
    },
    tags:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: "https://images.unsplash.com/photo-1596722366248-638b8c4c4363?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWxvbmUlMjB0cmVlfGVufDB8fDB8fHww"
    }
})
const Memories = mongoose.model('Memories', memoriesModel)

module.exports = Memories 
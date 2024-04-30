const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        required: true 
    }
})

const category = mongoose.model('Category', categorySchema)
module.exports = {category} 

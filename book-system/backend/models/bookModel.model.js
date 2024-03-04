const mongoose = require('mongoose')

const bookModel = mongoose.Schema(
{
    Title : {
        type: String,
        required: true 
    },
    Author: {
        type: String,
        required: true 
    },
    PublishDate:{
        type: Date,
        default: Date.now
    },
    ImageSource:{
        type: String 
    },
    Description:{
        type: String 
    }

}
)
const Book = mongoose.model('Book', bookModel)

module.exports = Book  
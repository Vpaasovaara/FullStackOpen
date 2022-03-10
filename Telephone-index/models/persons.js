
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})


personSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Persons', personSchema)

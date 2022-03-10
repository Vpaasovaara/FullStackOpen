const mongoose = require('mongoose')

// 4.16*: blogilistan laajennus, step4
const userSchema = mongoose.Schema({
    username: {
        type: String
        //minLength: 3,
        //unique: true,
        //required: true
    },
    password: {
        type: String
        //minLength: 3,
        //required: true
    },
    name: {
        type: String
        //required: ,true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

module.exports = mongoose.model('Users', userSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Feedback', feedbackSchema)
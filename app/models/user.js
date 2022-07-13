const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true, min: 10},
    address: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'customer'},
},{ timestamps: true})

module.exports = mongoose.model('User', userSchema)
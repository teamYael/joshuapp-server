const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
})

module.exports = mongoose.model('User', userSchema);
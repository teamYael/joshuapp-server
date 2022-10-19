const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    idToken: String,
    name: String,
    surname: String,
    email: String,
    active: Boolean
})

module.exports = mongoose.model('User', userSchema);
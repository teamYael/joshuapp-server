const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    token: String,
    name: String,
    email: String,
    joshua: Boolean,
    active: Boolean
})

module.exports = mongoose.model('User', userSchema);
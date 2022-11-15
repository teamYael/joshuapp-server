const mongoose = require('mongoose');
const { Schema } = mongoose;

const dollSchema = new Schema({
location: String,
isFound: Boolean,
dollPart: String,
photoPart: String
})


module.exports = mongoose.model('Doll', dollSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const dollPieceModel = new Schema({
    name: String,
    location: {
        longitude: { type: Number, default: null }, 
        latitude:  { type: Number, default: null }
    },
    isFound: { type: Boolean, default: false },
    photo: String
})


module.exports = mongoose.model('DollPiece', dollPieceModel);
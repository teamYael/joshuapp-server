const mongoose = require('mongoose');
const { Schema } = mongoose;
const dollPieceModel = require('./dollPieceModel')

const dollSchema = new Schema({
    misionStatus: String,
    dollPieces:[{type: Schema.ObjectId, ref: dollPieceModel}]
})


module.exports = mongoose.model('Doll', dollSchema);
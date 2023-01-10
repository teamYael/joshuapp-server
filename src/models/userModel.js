const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  token: String,
  name: String,
  email: String,
  joshua: Boolean,
  active: Boolean,
  avatar: String,
  life: Number,
  money: Number,
  onCrypt: Boolean,
  concentration: { type: Number, min: 0, max: 100 },
  endurance: { type: Number, min: 0, max: 100 },
  idSocket: String,
  userState: String,
  genre: String,
  isPoison: Boolean,
});

module.exports = mongoose.model("User", userSchema);

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommandSchema = new Schema({
  name: {
    type: String,
    lowercase: true
  },
  message: String,
  userId: {
    type: String,
    default: null
  },
  spriteId: {
    type: String,
    default: null
  }
});

var Command = mongoose.model("Command", CommandSchema);
module.exports = Command;
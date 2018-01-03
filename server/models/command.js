var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommandSchema = new Schema({
  name: {
    type: String,
    lowercase: true
  },
  action: {
    type: String,
    default: null
  },
  message: {
    type: String
  }
});

var Command = mongoose.model("Command", CommandSchema);
module.exports = Command;
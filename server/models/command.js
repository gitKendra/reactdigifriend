var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommandSchema = new Schema({
  name: {
    type: String,
    lowercase: true
  },
  message: String,
  user_id: {
    type: Schema.Types.ObjectId,
    default: null
  },
  sprite_id: {
    type: Schema.Types.ObjectId,
    default: null
  }
});

var Command = mongoose.model("Command", CommandSchema);
module.exports = Command;
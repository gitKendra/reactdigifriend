var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SpriteSchema = new Schema({
  sid: {
    type: String,
    unique: true,
    default: 1
  },
  name: {
    type: String
  },
  img: {
    type: String
  },
  commands: [{
   name: String,
   message: String,
   action: String 
  }]
});

var Sprite = mongoose.model("Sprite", SpriteSchema);
module.exports = Sprite;
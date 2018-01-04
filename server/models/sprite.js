var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SpriteSchema = new Schema({
  name: {
    type: String
  },
  img: {
    type: String
  }
});

var Sprite = mongoose.model("Sprite", SpriteSchema);
module.exports = Sprite;
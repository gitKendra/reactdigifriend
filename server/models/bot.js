var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BotSchema = new Schema({
  botname: {
    type: String
  },
  oAuth: {
    type: String
  },
  channels: {
    type: Array
  }
});

var Bot = mongoose.model("Bot", BotSchema);
module.exports = Bot;
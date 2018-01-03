var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String
  },
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  },
  botName: {
    type: String
  },
  channels: {
    type: [String]
  }

});

var User = mongoose.model("User", UserSchema);
module.exports = User;
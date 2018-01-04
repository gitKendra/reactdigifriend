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
  botSettings: {
    name: { type: String },
    oAuth: { type: String },
    channels: { type: [String], default: undefined }
  },
  sprite_id: {
    type: Integer
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
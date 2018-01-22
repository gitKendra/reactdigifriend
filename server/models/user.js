var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  pid: {
    type: String,
    unique: true
  },
  username: {
    type: String
  },
  logo: {
    type: String
  },
  email: {
    type: String
  },
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  },
  idToken: {
    type: String
  },
  botSettings: {
    name: { type: String },
    oAuth: { type: String },
    channels: { type: [String], default: undefined }
  },
  sprite_id: {
    type: Number
  }

});

var User = mongoose.model("User", UserSchema);

module.exports = User;
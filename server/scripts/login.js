// Define our dependencies
var express        = require('express');
var session        = require('express-session');
var passport       = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var request        = require('request');
var handlebars     = require('handlebars');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

// Define our constants, you will change these with your own
const TWITCH_CLIENT_ID = 'cz5r5jo1fw4qa3mgjexm4pedin6bmf';
const TWITCH_SECRET    = 'ka0p7t9kmi468ymxbxprguwdu6gwc4';
const SESSION_SECRET   = '<SOME SECRET HERE>';
const CALLBACK_URL     = 'http://localhost:3000/auth/twitch/callback';  // You can run locally with - http://localhost:3000/auth/twitch/callback

// Initialize Express and middlewares
var app = express();
app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  var options = {
    url: 'https://api.twitch.tv/kraken/user',
    method: 'GET',
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': 'OAuth ' + accessToken
    }
  };

  request(options, function (error, response, body) {
    if (response && response.statusCode == 200) {
      done(null, JSON.parse(body));
    } else {
      done(JSON.parse(body));
    }
  });
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use('twitch', new OAuth2Strategy({
    authorizationURL: 'https://api.twitch.tv/kraken/oauth2/authorize',
    tokenURL: 'https://api.twitch.tv/kraken/oauth2/token',
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_SECRET,
    callbackURL: CALLBACK_URL,
    state: true
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;

    console.log(profile);

    // Store profile in User database
   User.findOneAndUpdate(
     { twitchId: profile._id },
     { $set: { 
        twitchId: profile._id, 
        username: profile.display_name,  
        logo: profile.logo,
        email: profile.email
      } },
     { new: true, upsert: true },
    function(err, dbUser){
      if(err) console.log(err);
      else console.log(dbUser);
    });

    done(null, profile);
  }
));

// Set route to start OAuth link, this is where you define scopes to request
app.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user_read' }));

// Set route for OAuth redirect
app.get('/auth/twitch/callback', passport.authenticate('twitch', { successRedirect: '/', failureRedirect: '/' }));

// Define a simple template to safely generate HTML with values from user's profile
var template = handlebars.compile(`
<html><head><title>Twitch Auth Sample</title></head>
<table>
    <tr><th>Access Token</th><td>{{accessToken}}</td></tr>
    <tr><th>Refresh Token</th><td>{{refreshToken}}</td></tr>
    <tr><th>Display Name</th><td>{{display_name}}</td></tr>
    <tr><th>Bio</th><td>{{bio}}</td></tr>
    <tr><th>Image</th><td>{{logo}}</td></tr>
    <tr><th>Twitch ID</th><td>{{_id}}</td></tr>
</table></html>`);

// If user has an authenticated session, display it, otherwise display link to authenticate
app.get('/', function (req, res) {
  if(req.session && req.session.passport && req.session.passport.user) {
    res.send(template(req.session.passport.user));
  } else {
    res.send('<html><head><title>Twitch Auth Sample</title></head><a href="/auth/twitch"><img src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png"></a></html>');
  }
});

// If deployed, use the deployed database. Otherwise use the local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/digifriend";

mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

var User = mongoose.model('User', { 
  twitchId: {type:String, unique:true}, 
  username: String, 
  logo: String, 
  email: String,
  botSettings: {
    botname: String,
    oAuth: String,
    channel: { type: [String], default: undefined}
  },
  spriteId: Number
 });

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.listen(PORT, function() {
  console.log(`App server now on port ${PORT}!`);
});

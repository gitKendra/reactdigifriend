const express         = require("express");
const path            = require("path");
const bodyParser      = require("body-parser");
const logger          = require("morgan");
const mongoose        = require("mongoose");
const session         = require('express-session');
const passport        = require('passport');
const OAuth2Strategy  = require('passport-oauth').OAuth2Strategy;
const request         = require('request');
const TwitchAppConfig = require('./config/twitchAppConfig');
//const botClient = require("./scripts/botCommands.js");

// Require Schemas
// const Command = require("./models/command");
// const User = require("./models/user");
// const Sprite = require("./models/sprite");
const model = require("./models");

const PORT = process.env.PORT || 3001;

// Initialize Express and middlewares
const app = express();
app.use(session({secret: TwitchAppConfig.SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// Require our routes
var routes = require("./routes");

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Enable CORS so that browsers don't block requests.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// If deployed, use the deployed database. Otherwise use the local database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/digifriend";

mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  var options = {
    url: 'https://api.twitch.tv/kraken/user',
    method: 'GET',
    headers: {
      'Client-ID': TwitchAppConfig.TWITCH_CLIENT_ID,
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
    clientID: TwitchAppConfig.TWITCH_CLIENT_ID,
    clientSecret: TwitchAppConfig.TWITCH_SECRET,
    callbackURL: TwitchAppConfig.CALLBACK_URL,
    state: true
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;

    console.log(profile);

    // Store profile in User database
   model.User.findOneAndUpdate(
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


// ----------------------------------------------------
// ROUTES 
app.get("/user/:id", function(req, res) {
  model.Command
    .findById(req.params.id, function(err, doc) {
      if (err) console.log(err);
      console.log(doc)
  }).then(function(dbUser) {
    res.json(dbUser);
  })
})

app.post("/user/")

// Any non API GET routes will be directed to our React App and handled by React Router
app.get("*", function(req, res) {
  if ( process.env.NODE_ENV === 'production' ) {
    res.sendFile(__dirname + "/client/build/index.html");
  } else {
    res.sendFile(__dirname + "/client/public/index.html");
  }
});

// ---------------------------------------------------------
app.listen(PORT, function() {
  console.log(`App server now on port ${PORT}!`);
});
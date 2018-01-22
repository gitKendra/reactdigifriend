// Include Server Dependencies
var express     = require("express");
var bodyParser  = require("body-parser");
var logger      = require("morgan");
var mongoose    = require("mongoose");

// Require Schemas
var Model = require("./models");

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 4000;

// Run Morgan for Logging
// app.use(logger("dev"));
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
// Serve files created by create-react-app.
app.use(express.static("client/build"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/digifriend";
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, {useMongoClient: true});

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------
// Route to get all user saved commands and return them sorted alphabetically
app.get("/api/saved/user/:id", function(req, res) {
  Model.Command.find({userId : req.params.id}).sort('name')
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
});

// Route that returns the Sprite doc from database
app.get("/api/sprite/:id", function(req, res) {
  Model.Sprite.find({_id : req.params.id})
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
});

// Route to add command to saved list
app.post("/api/saved", function(req, res) {
  var newCommand = new Model.Command(req.body);
  console.log(req.body);
  newCommand.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// Route to delete a command from saved list
app.delete("/api/saved/:id", function(req, res) {
  console.log("req.params.id = " + req.params.id);
  Model.Command.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Deleted");
    }
  });
});

// Get document about a specific sprite
app.get("/api/sprite/:id", function(req, res) {
  Model.Sprite.findOne({ id : req.params.id })
  .exec(function(err, doc){
    if(err) {
      console.log(err);
    }
    else {
      res.json(doc);
    }
  });
});

// Get all sprites from db
app.get("/api/sprite", function(req, res) {
  Model.Sprite.find({})
  .exec(function(err, doc){
    if(err) {
      console.log(err);
    }
    else {
      res.json(doc);
    }
  });
});

// Get document about a specific user
app.get("/api/user/:id", function(req, res) {
  Model.User.findById(req.params.id)
  .exec(function(err, doc){
    if(err) {
      console.log(err);
    }
    else {
      res.json(doc);
    }
  });
})

// Add user to database
app.post("/api/user", function(req, res) {

  var user = req.body;

  Model.User.findOneAndUpdate(
    {
      email: user._profile.email
    },{
      username: user._profile.name,
      logo: user._profile.profilePicURL,
      email: user._profile.email,
      pid: user._profile.id,
      accessToken: user._token.accessToken,
      idToken: user._token.idToken
    },{
      upsert: true, 
      new: true,
      setDefaultsOnInsert: true
    }, function(err, doc) {
      if(err){
        console.log(err)
      }
      else{
        res.json(doc)
      }
    }
  )
});

// Update user settings
app.post("/api/user/:id/settings/", function(req, res){
  console.log(req.body);
  Model.User.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      sprite_id: req.body.sid,
      botSettings: req.body.bot
    },
    {
      upsert: true, 
      new: true,
      setDefaultsOnInsert: true
    },
    function(err, doc){
      if(err){
        console.log(err)
      }
      else{
        res.json(doc)
      }
    }
  )
});

// Any non API GET routes will be directed to our React App and handled by React Router
app.get("*", function(req, res) {
  if ( process.env.NODE_ENV === 'production' ) {
    res.sendFile(__dirname + "/client/build/index.html");
  } else {
    res.sendFile(__dirname + "/client/public/index.html");
  }
});

// -------------------------------------------------
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

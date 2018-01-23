const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
  {
    useMongoClient: true
  }
);

const spriteSeed = [
    {
        "_id" : ObjectId("5a650242923f4b1134f023d6"),
        "sid" : "1",
        "name" : "Bob",
        "img" : "https://image.ibb.co/bCQyib/sprite1.png",
        "commands" : [ 
            {
                "name" : "jump",
                "message" : "I'm a jumping bean!",
                "action" : "jump"
            }, 
            {
                "name" : "love",
                "message" : "I can feel the love <3",
                "action" : "love"
            }
        ]
    },
    {
        "_id" : ObjectId("5a6613204361b04728737126"),
        "sid" : "2",
        "name" : "John",
        "img" : "https://image.ibb.co/bCQyib/sprite1.png",
        "commands" : [ 
            {
                "name" : "jump",
                "message" : "I'm a jumping bean!",
                "action" : "jump"
            }, 
            {
                "name" : "love",
                "message" : "I can feel the love <3",
                "action" : "love"
            }
        ]
    }
]

db.Sprite
.remove({})
.then(() => db.Sprite.collection.insertMany(spriteSeed))
.then(data => {
  console.log(data.insertedIds.length + " records inserted!");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
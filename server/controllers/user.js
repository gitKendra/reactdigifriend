// Controller for our users
// ========================
var db = require("../models");

module.exports = {
  // Find one user
  findOne: function(req, res) {
    db.User
      .findOne(req.query)
      .then(function(dbUser) {
        res.json(dbUser);
    });
  },
  // Create a new user
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
    });
  },
  // Delete a user with a given id
  delete: function(req, res) {
    db.User
      .remove({ _id: req.params.id })
      .then(function(dbUser) {
        res.json(dbNote);
    });
  },
  // update: function(req,res) {
  //   db.User
  //       .
  // },
  findOrCreate: function(req,res){
    db.User.findOrCreate({
        where: {

        }

  })
};

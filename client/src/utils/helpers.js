// Include the Axios library for HTTP requests
import axios from "axios";

// Helper Functions
const helpers = {

  // Returns saved custom commands by user from our database
  getSaved: function(id) {
    return axios.get(`/api/saved/user/${id}`)
      .then(function(results) {
        console.log("axios results getSaved:", results);
        return results;
      });
  },

  // Saves new commands to our database
  postSaved: function(name, message, userId) {
    var formattedName = name.trim();

    var newCommand = { name: formattedName, message: message, userId: userId };

    console.log('postSaved', formattedName)

    return axios.post("/api/saved", newCommand)
      .then(function(response) {
        console.log("axios results", response);
        return response.data;
      });
  },

  // Removes saved commands from our database
  deleteSaved: function(id) {

    return axios.delete(`/api/saved/${id}`)
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  },

  getUser: function(id) {

    return axios.get(`/api/user/${id}`)
    .then(function(results){
      console.log("axios results getUser:", results);
      return results;
    })
   
  },

  postUser: function(email) {

    return axios.post('/api/user', email)
    .then(function(results){
      console.log("axios results postUser:", results)
      return results;
    })
  },

  updateSettings: function(uid, sid, bot) {

    return axios.post(`/api/user/${uid}/settings/`, {sid, bot})
    .then(function(results){
      console.log("axios results updateSettings", results)
      return results;
    })
  },

  getAllSprites: function() {
    
    return axios.get("/api/sprite")
      .then(function(results) {
        console.log("axios results getSprites:", results);
        return results;
      });
  },


  // Returns the Sprite doc from our database given the sprite id
  getSprite: function(id) {

    return axios.get(`/api/sprite/${id}`)
      .then(function(results) {
        console.log("axios results getSprite:", results);
        return results;
      });
  }

};


// We export the helpers function
export default helpers;
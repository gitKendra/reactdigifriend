// Include the Axios library for HTTP requests
import axios from "axios";

// Helper Functions
const helpers = {

  // This will return any saved commands from our database
  getSaved: function() {
    return axios.get("/api/saved")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  // This will save new commands to our database
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
    // // This will update an existing command to our database
    // updateSaved: function(command) {
    //   var updatedCommand = { name: command.name, message: command.message };
    //   console.log('updateSaved', name);
    //   return axios.put("/api/saved/${command._id}", updatedCommand)
    //     .then(function(response) {
    //       console.log("axios results", response);
    //       return response.data;
    //     });
    // },
  // This will remove saved commands from our database
  deleteSaved: function(id) {

    return axios.delete(`/api/saved/${id}`)
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  },

  twitchLogin: function() {
    return axios.get("/auth/twitch")
    .then(function(results){
      console.log("axios results", results);
      return results;
    })
  }
};

// We export the helpers function
export default helpers;
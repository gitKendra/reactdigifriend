var tmi = require("tmi.js");

var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "digiFriend",
        password: "oauth:x1s1yh51096v7tpbeu0eo55yyfzive",
    },
    channels: ["#digiFriend"]
};

var client = new tmi.client(options);

// Connect the client to the server..
client.connect();

module.exports = client;
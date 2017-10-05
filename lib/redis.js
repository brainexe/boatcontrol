var redis   = require('redis'),
    config  = require('./config'),
    clients = {};

module.exports = function(clientKey) {
    clientKey = clientKey || 'default';

    if (clients[clientKey]) {
        return clients[clientKey];
    }

    var client = redis.createClient(config.redis);
    clients[clientKey] = client;

    client.on("error", function (err) {
        console.log("Error: " + err.red);
    });

    return client;
};

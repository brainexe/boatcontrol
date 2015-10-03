var redis   = require('redis'),
    config  = require('./config'),
    clients = {};

module.exports = function(key) {
    key = key || 'default';

    if (clients[key]) {
        return clients[key];
    }

    var client = redis.createClient(config.redis);
    clients[key] = client;

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    return client;
};

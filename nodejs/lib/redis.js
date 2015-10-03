var redis   = require("redis");
    clients = {};

module.exports = function(key) {
    key = key || 'default';

    if (clients[key]) {
        return clients[key];
    }

    var client = redis.createClient();
    clients[key] = client;

    return client;
};

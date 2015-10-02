
var AbstractOutput = require('./abstract_output'),
    redis  = require("redis"),
    client = redis.createClient(); // todo config

var Redis = function() {
};

Redis.prototype = new AbstractOutput();

Redis.prototype._sendCommand = function(type, pin, value) {
    client.publish('output', [type, pin, value].join(':'));
};

Redis.prototype._setServo = function(pin, value) {
    this._sendCommand('s', pin, value);
};

Redis.prototype._setDigital = function(pin, value) {
    this._sendCommand('d', pin, value);
};

Redis.prototype._setAnalog = function(pin, value) {
    this._sendCommand('a', pin, value);
};

Redis.prototype._setPwm = function(pin, value) {
    this._sendCommand('s', pin, value);
};

module.exports = Redis;

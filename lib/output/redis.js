
var AbstractOutput = require('./abstract_output'),
    redis  = require('../redis'),
    config = require('../config');

var Redis = function() {
    this.client = redis();

    this.client.del('pins');
};

Redis.prototype = new AbstractOutput();

Redis.prototype._sendCommand = function(type, pin, value) {
    this.client.publish('output', [config.instanceId, type, pin, value].join(':'));
    this.client.hset('pins', pin, type + "-" + value);
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

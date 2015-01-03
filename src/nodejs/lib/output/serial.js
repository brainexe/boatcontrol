
var AbstractOutput = require('./abstract_output');
var SerialPort = require("serialport").SerialPort;
var config = require("../../config");
var globule = require('globule');

var QUEUE_INTERVAL = 4;

var Serial = function(device, baud) {
    this.queue = [];

    var result = globule.find(device);
    if (!result.length) {
        throw "no devide found at: " + device;
    }

    this.serialPort = new SerialPort(result[0], {
        baudrate: baud
    });

    var self = this;
    setInterval(function() {
        var line = self.queue.pop();
        if (line) {
            self.serialPort.write(line);
        }
    }, QUEUE_INTERVAL);
};

Serial.prototype = new AbstractOutput();

Serial.prototype._setPin = function(pin, value) {
    var line = "p:" + pin + ":" + value + "\n";

    this._queue(line);
};

Serial.prototype._setServo = function(pin, value) {
    var line = "s:" + pin + ":" + value + "\n";

    this._queue(line);
};

Serial.prototype._queue = function(line) {
    if (config.debug.output) {
        console.log('serial', line);
    }

    this.queue.push(line);
};

Serial.list = function() {
    this.serialPort.list(function (err, ports) {
        ports.forEach(function(port) {
            console.log(port.comName);
            console.log(port.pnpId);
            console.log(port.manufacturer);
        });
    });
};

module.exports = Serial;


var AbstractOutput = require('./abstract_output');
var SerialPort = require("serialport").SerialPort;
var config = require("../../config");

var Serial = function(device, baud) {
    this.serialPort = new SerialPort(device, {
        baudrate: baud
    });
};

Serial.prototype = new AbstractOutput();

Serial.prototype._setPin = function(pin, value) {
    var line = "pin:" + pin + ":" + value + "\n";

    this._println(line);
};

Serial.prototype._setServo = function(pin, value) {
    var line = "servo:" + pin + ":" + value + "\n";

    this._println(line);
};

Serial.prototype._println = function(line) {
    if (config.debug) {
        console.log('serial', line);
    }
    this.serialPort.write(line);
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

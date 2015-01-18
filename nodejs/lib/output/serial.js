
var SerialPort = require("serialport");
var AbstractOutput = require('./abstract_output');
var config = require("../../config");
var globule = require('globule');

var QUEUE_INTERVAL = 4;

var Serial = function(device, baud) {
    this.queue = [];

    var result = globule.find(device);
    if (!result.length) {
        throw "no device found at: " + device;
    }

    this.serialPort = new SerialPort.SerialPort(result[0], {
        baudrate: baud,
        parser: SerialPort.parsers.readline("\n"),
        disconnectedCallback: function() {
            // todo reconnect
            console.log('disconnected', arguments)
        }
    });

    this.serialPort.on('error', function() {
        console.log('error', arguments)
    });

    this.serialPort.on('data', function(data) {
        //console.log(data.yellow);

        var value = data.substr(2);
        switch (data[0]) {
            case 'd':
                console.log(value.yellow);
                break;
            case 'e':
                console.error(value.red);
                break;
            default:
                console.error(("undefined response: " + data).red);
        }
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

Serial.prototype._setDigital = function(pin, value) {
    this._queue('d', pin, value);
};

Serial.prototype._setServo = function(pin, value) {
    this._queue('s', pin, value);
};

Serial.prototype._setAnalog = function(pin, value) {
    this._queue('a', pin, value);
};

Serial.prototype._setPwm = function(pin, value) {
    this._queue('s', pin, value);
};

Serial.prototype._queue = function(action, pin, value) {
    var line = action + ":" + pin + ":" + value + "\n";

    if (config.debug.output) {
        console.log('serial ' + line.blue);
    }

    this.queue.push(line);
};

module.exports = Serial;

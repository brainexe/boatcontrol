
var AbstractOutput = require('./abstract_output');
var SerialPort = require("serialport").SerialPort;

var Serial = function(device, baud) {
    this.serialPort = new SerialPort(device, {
        baudrate: baud
    });
};

Serial.prototype = new AbstractOutput();
Serial._setValue = function(pin, value) {
    self.serialPort.write(pin + ":" + value + "\n");
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

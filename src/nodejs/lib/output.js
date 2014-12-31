
var config = require("../config");

var Output = function() {
};

Output.prototype.setServo = function(pin, value) {
    console.log(pin, ":", value);
    if (!pin) {
        return;
    }

    this._setValue(pin, value);
};

Output.prototype.setPin = function(pin, value) {
    console.log(pin + ": " + value);
    if (!pin) {
        return;
    }

    this._setValue(pin, value);
};

Output.prototype._setValue = function(pin, value) {
    throw "_setValue is not implemented";
};

var Debug = function() {

};
Debug.prototype = new Output();
Output.prototype._setValue = function(pin, value) {
};

var Serial = function(device, baud) {
    var SerialPort = require("serialport").SerialPort;

    this.serialPort = new SerialPort(device, {
        baudrate: baud
    });
};

Serial.prototype = new Output();
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

var Raspberry = function() {
    this.output_pins = {};
    this.gpio = require("gpio");
};

Raspberry.prototype = new Output();

Raspberry._setValue = function(pin, value) {
    if (!this.output_pins[pin]) {
        this.output_pins[pin] = this.gpio.export(pin, {
            direction: "out"
        });
    }

    this.output_pins[pin].set(value);
};

var output;
switch (config.device) {
    case 'debug':
        output = new Debug();
        break;
    case 'raspberry':
        output = new Raspberry();
        break;
    case 'serial':
        output = new Serial(config.serial_device, config.serial_baud);
        break;
}

module.exports = output;

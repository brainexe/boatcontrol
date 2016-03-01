
var arduino = require('duino'),
    config = require("../config"),
    AbstractOutput = require('./abstract_output');

var servos = {};

var Serial = function(device, baud) {
    this.connected = false;

    try {
        // todo pss parameters
        // todo fix throw er; // Unhandled 'error' event Error: Cannot open /dev/usb
        //this.connect();
        // this.connected = true;
    } catch (e) {
        console.log('Can connect to arduio!');
    }
};

Serial.prototype = new AbstractOutput();

Serial.prototype.connect = function() {
    this.board = new arduino.Board({
        debug: config.debug
    });

    this.board.on('ready', function(){
        // do stuff
    });

    this.board.on('error', function(){
        console.log(arguments)
    });

    this.board.on('data', function(data) {
        console.log(data.yellow);
    });
};

Serial.prototype._setDigital = function(pin, value) {
    if (!this.connected) {
        return;
    }

    value = value ? board.HIGH : board.LOW;
    this.board.digitalWrite(pin, value);
};

Serial.prototype._setServo = function(pin, value) {
    if (!this.connected) {
        return;
    }

    var servo;
    if (servos[pin]) {
        servo = servos[pin];
    } else {
        servo = new arduino.Servo({
            board: this.board,
            pin: pin
        });
    }

    servo.write(value);
};

Serial.prototype._setAnalog = function(pin, value) {
    if (!this.connected) {
        return;
    }

    this.board.analogWrite(pin, value);
};

Serial.prototype._setPwm = function(pin, value) {
    if (!this.connected) {
        return;
    }

    this.board.analogWrite(pin, value);
};

module.exports = Serial;

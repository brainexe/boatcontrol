
var arduino = require('duino'),
    config  = require('../config'),
    AbstractOutput = require('./abstract_output');

var servos = {};

var Serial = function() {
    this.connect();
};

Serial.prototype = new AbstractOutput();

Serial.prototype.connect = function() {
    this.connected = false;

    try {
        this.board = new arduino.Board({
            debug:    config.debug,
            device:   'ttyUSB*|ttyACM*',
            devregex: 'ttyUSB*|ttyACM*' // other duino library
        });

        this.board.setMaxListeners(10000);

        var self = this;
        this.board.on('ready', function() {
            console.log('Serial '.green + self.board.serial.path.blue + ' device is ready!'.green);
        });
        this.board.on('connect', function() {
            console.log('Serial '.green + self.board.serial.path.blue + ' device is connected!'.green);
        });

        this.board.on('error', function(error) {
            console.error('Error in serial device: '.red + error)
        });

        this.board.on('data', function(data) {
            console.log(data.yellow);
        });
        this.connected = true;
    } catch (e) {
        console.error('Can\'t connect to Arduino!: '.red + e);
        this.connected = false;
    }
};

Serial.prototype._setDigital = function(pin, value) {
    value = value ? this.board.HIGH : this.board.LOW;
    this.board.digitalWrite(pin, value);
};

Serial.prototype._setServo = function(pin, value) {
    var servo;
    if (servos[pin]) {
        servo = servos[pin];
    } else {
        servo = new arduino.Servo({
            board: this.board,
            pin: pin
        });
        servo.attach();
    }

    servo.write(value);
};

Serial.prototype._setAnalog = function(pin, value) {
    this.board.analogWrite(pin, value);
};

Serial.prototype._setPwm = function(pin, value) {
    this.board.analogWrite(pin, value);
};

module.exports = Serial;

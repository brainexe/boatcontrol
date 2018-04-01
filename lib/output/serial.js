
const arduino = require('duino'),
      config  = require('../config'),
      AbstractOutput = require('./abstract_output');

let servos = {};

const Serial = function() {
    this.connect();
};

Serial.prototype = new AbstractOutput();

Serial.prototype.connect = function() {
    this.connected = false;

    try {
        this.board = new arduino.Board({
            debug:    config.debug,
            device:   'ACM',
            devregex: 'ttyUSB*|ttyACM*' // other duino library
        });
        this.board.setup();
        this.board.setMaxListeners(10000);

        this.board.on('ready', () => {
            console.log('Serial '.green + this.board.serial.path.blue + ' device is ready!'.green);
        });

        this.board.on('connect', () => {
            console.log('Serial '.green + this.board.serial.path.blue + ' device is connected!'.green);
        });

        this.board.on('error', function(error) {
            console.error('[Serial] '.green + 'Error in serial device: '.red + error)
        });

        if (config.debug) {
            this.board.on('data', function(data) {
                console.log(data.yellow);
            });
        }
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

Serial.prototype._setPwm = function(pin, value) {
    if (!this.board.serial) {
        // skip servos when not connected yet
        // todo implement reconnect
        console.log('Skipped servo value...board is not connected yet');
        return;
    }

    let servo;
    if (servos[pin]) {
        servo = servos[pin];
    } else {
        servo = servos[pin] = new arduino.Servo({
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

module.exports = Serial;

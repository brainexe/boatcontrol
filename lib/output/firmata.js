
const firmata      = require('firmata'),
    AbstractOutput = require('./abstract_output');

class Firmata extends AbstractOutput {
    constructor() {
        super();

        this.board = null;
        this.servos = {};
        this.connected = false;
        this.connect();
    }

    connect() {
        firmata.requestPort((error, port) => {
            if (error) {
                console.log(error);
                return;
            }
            this.board = new Board(port.comName);
            this.board.on('ready', function() {
                this.connected = true;
            });
        });
    };

    _setPwm(pin, value) {
        if (!this.servos[pin]) {
            this.board.pinMode(pin, board.MODES.SERVO);
            this.board.servoConfig(pin, pin.min, pin.max);
            this.servos[pin] = true;
        }
        this.board.servoWrite(pin, value);
    }

    _setDigital(pin, value) {
        this.board.digitalWrite(pin, value);
    }

    _setAnalog(pin, value) {
        this.board.analogWrite(pin, value);
    }
}

module.exports = Firmata;

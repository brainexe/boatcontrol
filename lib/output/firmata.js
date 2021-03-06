
const firmata      = require('firmata'),
    AbstractOutput = require('./abstract_output');

class Firmata extends AbstractOutput {
    constructor(options) {
        super();

        this.board = null;
        this.pwms  = {};

        this.connect(options)
    }

    connect(options) {
        // todo pass wifi port/address etc via etherport
        if (options.port) {
            this.board = new Board(options.port);
            this.board.on('ready', () => {
                this.connected()
            });
        } else {
            firmata.requestPort((error, port) => {
                if (error) {
                    console.log("[Firmata]", error);
                    return;
                }
                this.board = new Board(port.comName);
                this.board.on('ready', () => {
                    this.connected()
                });
            });
        }
    };

    _setPwm(pin, value, pinObject) {
        if (!this.pwms[pin]) {
            this.board.pinMode(pin, board.MODES.SERVO);
            this.board.servoConfig(pin, pinObject.min, pinObject.max);
            this.pwms[pin] = true;
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


const arduino = require('duino'),
      config  = require('../config'),
      AbstractOutput = require('./abstract_output');


const defaultOptions = {
    debug:    config.debug,
    device:   'ACM',
    devregex: 'ttyUSB*|ttyACM*' // other duino library
};

class Serial extends AbstractOutput {
    constructor() {
        super();

        this.servos = {};

        this.connect();
    }

    connect(options) {
        try {
            this.board = new arduino.Board(
                Object.assign({}, defaultOptions, options)
            );
            this.board.setup();
            this.board.setMaxListeners(10000);

            this.board.on('ready', () => {
                console.log('[Serial] '.green + this.board.serial.path.blue + ' device is ready!'.green);
            });

            this.board.on('connect', () => {
                console.log('[Serial] '.green + this.board.serial.path.blue + ' device is connected!'.green);

                this.connected();
            });

            this.board.on('error', error => {
                console.error('[Serial] '.green + 'Error in serial device: '.red + error)
            });

            if (config.debug) {
                this.board.on('data', data => {
                    console.log(data.yellow);
                });
            }
        } catch (e) {
            console.error('Can\'t connect to Arduino!: '.red + e);
        }
    }

    _setDigital(pin, value) {
        value = value ? this.board.HIGH : this.board.LOW;
        this.board.digitalWrite(pin, value);
    }

    _setPwm(pin, value) {
        let servo;
        if (this.servos[pin]) {
            servo = this.servos[pin];
        } else {
            servo = this.servos[pin] = new arduino.Servo({
                board: this.board,
                pin: pin
            });
            servo.attach();
        }

        servo.write(value);
    }

    _setAnalog(pin, value) {
        this.board.analogWrite(pin, value);
    };
}

module.exports = Serial;

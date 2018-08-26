
const arduino = require('duino'),
      config  = require('../config'),
      AbstractOutput = require('./abstract_output');

let servos = {};

class Serial extends AbstractOutput {
    constructor() {
        super();

        this.connect();
        this.queue = [];
    }

    connect() {
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

                if (this.queue.length > 0) {
                    console.log('Execute ' + this.queue.length + ' queued events');
                    let func;
                    while (func = this.queue.pop()) {
                        func()
                    }
                }
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
        if (!this.board.serial) {
            this.queue.push(this._setDigital.bind(pin, value));
            console.log('Queue digital value...');
            return;
        }

        value = value ? this.board.HIGH : this.board.LOW;
        this.board.digitalWrite(pin, value);
    }

    _setPwm(pin, value) {
        if (!this.board.serial) {
            this.queue.push(this._setPwm.bind(pin, value));
            console.log('Queue servo value...');
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
    }

    _setAnalog(pin, value) {
        this.board.analogWrite(pin, value);
    };
}

module.exports = Serial;

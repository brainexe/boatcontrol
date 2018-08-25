
const Board = require('firmata');

const Firmata = function() {
    this.board = null;
    this.servos = {};
    this.connected = false;
    this.connect();
};
Firmata.prototype = new AbstractOutput();

Firmata.prototype.connect = function() {
    Board.requestPort((error, port) => {
        if (error) {
            console.log(error);
            return;
        }
        this.board = new Board(port.comName);

        this.board.on("ready", function() {
            this.connected = true;
        });
    });
};

Firmata.prototype._setDigital = function(pin, value) {
    this.board.digitalWrite(pin, value);
};

Serial.prototype._setPwm = function(pin, value) {
    if (!this.servos[pin]) {
        this.board.pinMode(pin, board.MODES.SERVO);
        this.board.servoConfig(pin, 0, 255); // todo config?
        this.servos[pin] = true;
    }
    this.board.servoWrite(pin, value);
};

Serial.prototype._setAnalog = function(pin, value) {
    this.board.analogWrite(pin, value);
};

module.exports = Serial;

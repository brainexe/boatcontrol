
const sounds = require('../sound');
let pinState = {};

module.exports = function(pin, input, output) {
    input.on(pin.button + ":press", function () {
        let id = pin.button + '__' + pin.pin;
        let value = !pinState[id];
        pinState[id] = value;

        // todo stop file
        sounds.playFile(pin.file)
    });
};

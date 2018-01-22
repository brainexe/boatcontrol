
const sound = require('../sound');

module.exports = function (pin, input, output) {
    input.on(pin.button + ":press", function () {
        sound.playFile(pin.file);
    });
};

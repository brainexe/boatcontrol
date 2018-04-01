const sound  = require('../sound');
const assert = require('assert');

// play a sound file when a button was pressed
module.exports = function (options, input) {
    assert(options.button, "no button defined");
    assert(options.file, "no file defined");

    input.on(options.button + ":press", () => {
        sound.playFile(options.file);
    });
};

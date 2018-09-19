const sound  = require('../sound'),
      input  = require('../input'),
      assert = require('assert');

// play a sound file when a button was pressed
module.exports = (options) => {
    assert(options.button, "no button defined");
    assert(options.file, "no file defined");

    input.on(options.button + ":press", () => {
        sound.playFile(options.file);
    });
};

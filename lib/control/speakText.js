const
      exec    = require('../util').exec,
      config  = require('../config'),
      assert  = require('assert');

module.exports = function (pin, input) {
    assert(pin.button, "no button defined");
    assert(pin.text, "no text defined");
    assert(config.speakExecutable, "no speakExecutable defined");

    input.on(pin.button + ":press", function () {
        console.log('say '.blue + pin.text.yellow);
        exec(config.speakExecutable + ' "' + pin.text + '"');
    });
};

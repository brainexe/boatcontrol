const
      exec    = require('../util').exec,
      config  = require('../config'),
      input   = require('../input'),
      assert  = require('assert');

module.exports = (pin) => {
    assert(pin.button, "no button defined");
    assert(pin.text, "no text defined");
    assert(config.speakExecutable, "no speakExecutable defined");

    input.on(pin.button + ":press", () => {
        console.log('say '.blue + pin.text.yellow);
        exec(config.speakExecutable + ' "' + pin.text + '"');
    });

    input.on("say", text => {
        console.log('say '.blue + text.yellow);
        exec(config.speakExecutable + ' "' + text + '"');
    });
};

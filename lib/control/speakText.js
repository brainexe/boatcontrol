const
      exec    = require('../util').exec,
      config  = require('../config');

module.exports = function (pin, input, output) {
    input.on(pin.button + ":press", function () {
        console.log('say '.blue + pin.text.yellow);
        exec(config.speakExecutable + ' ' + pin.text);
    });
};

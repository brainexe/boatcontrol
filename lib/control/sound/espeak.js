var os     = require('os'),
    exec   = require('child_process').exec,
    isMac  = os.platform() === 'dawin',
    command = isMac ? 'say' : 'espeak';

module.exports = function (pin, input, output) {
    input.on(pin.button + ":press", function () {
        console.log('say '.blue + pin.text.yellow);
        exec(command + ' ' + pin.text);
    });
};
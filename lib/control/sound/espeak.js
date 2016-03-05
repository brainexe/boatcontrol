
var exec = require('child_process').exec;

module.exports = function (pin, input, output) {
    input.on(pin.button + ":press", function () {
        console.log('say '.blue + pin.text.yellow);
        exec('espeak ' + pin.text);
    });
};

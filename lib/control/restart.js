
var exec = require('child_process').exec;

module.exports = function (pin, input, output) {
    input.on(pin.button + ":press", function () {
        console.log('restart '.blue);
        exec('espeak restart');
    });
};

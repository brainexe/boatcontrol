
var process = require('process');

module.exports = function (pin, input, output) {
    input.on(pin.button + ":press", function () {
        console.log('restart '.blue);
        process.exit(0);
    });
};


var exec = require('child_process').exec;

var pin_state = {};

module.exports = function(pin, input, output) {
    input.on(pin.button + ":press", function () {
        var id = pin.button + '__' + pin.pin;
        var value = !pin_state[id];
        pin_state[id] = value;

        exec('mplayer ' + __dirname + '/../../sounds/' + pin.file, function(error, stdout, stderr) {
            console.log('Played file '.blue + pin.file);
        });
    });
};

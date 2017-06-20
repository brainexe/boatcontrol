
var exec = require('child_process').exec;

module.exports = function (pin, input, output) {
    input.on(pin.button + ":press", function () {
        console.log('Play file '.blue + pin.file);

        exec('mplayer ' + __dirname + '/../../sounds/' + pin.file, function(error, stdout, stderr) {
            console.log('Played file '.blue + pin.file);
        });
    });
};

var config    = require("./config");
var output    = require("./lib/output");
var dualShock = require('dualshock-controller');

var controller = dualShock({
    config: config.controller,
    //smooths the output from the analog sticks (moving averages) defaults to false
    analogStickSmoothing: false
});

controller.on('connected', function () {
    console.log('connected :)');
});
controller.on('error', function (data) {
    console.log('controller error:', data);
});

if (config.debug) {
    require('./control/debug')(config, controller, output);
}

require('./control/power')(config, controller, output);
require('./control/sound_light')(config, controller, output);
require('./control/monitors')(config, controller, output);

console.log('started...');
controller.connect();

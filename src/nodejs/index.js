
var config    = require("./config");
var output    = require("./lib/output");
var dualShock = require('dualshock-controller');

var controller = dualShock({
    config: config.controller,
    analogStickSmoothing: false,
    motionInputs: true
});

controller.on('connected', function () {
    console.log('connected :)');
});
controller.on('error', function (data) {
    console.log('controller error:', data);
});

if (config.debug.controller) {
    require('./control/debug')(config, controller, output);
}

require('./lib/control/power')(config, controller, output);
require('./lib/control/sound_light')(config, controller, output);
require('./lib/control/water')(config, controller, output);
require('./lib/control/generic')(config, controller, output);

console.log('started...');
controller.connect();

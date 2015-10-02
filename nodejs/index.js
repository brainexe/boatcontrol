var config;
try {
    config = require("./config");
} catch (e) {
    var fs = require('fs');
    fs.writeFileSync('./config.js', fs.readFileSync('./config.default.js'));
    config = require("./config");
    console.log("Created config.js out of composer.json")
}

var output    = require("./lib/output");
var dualShock = require('dualshock-controller');
require('colors');

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

require('./lib/control/all')(config, controller, output);

console.log('started...'.green);
controller.connect();

var
    output    = require('./lib/output'),
    config    = require('./lib/config'),
    colors    = require('colors');

var emitter = require('./lib/input')();

var control = require('./lib/control/all');
control(config, emitter, output);

console.log(colors.green('started...'));

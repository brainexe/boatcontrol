var
    output    = require('./lib/output'),
    config    = require('./lib/config'),
    colors    = require('colors');

var emitter = require('./lib/input')();

var control = require('./lib/control');
control.loadAll(emitter, output);

var plugins = require('./lib/plugins');
plugins.loadAll(emitter, output);

console.log(colors.green('started...'));
emitter.emit('debug', 'Started App in instance: ' + config.instanceId);

var
    input   = require('./lib/input'),
    output  = require('./lib/output'),
    emitter = require('./lib/input')(),
    config  = require('./lib/config'),
    control = require('./lib/control'),
    plugins = require('./lib/plugins');

control.loadAll(emitter, output);
plugins.loadAll(emitter, input, output);

require('./lib/server');

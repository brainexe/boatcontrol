const
    control = require('./lib/control'),
    plugins = require('./lib/plugins');

control.loadAll();
plugins.loadAll();

require('./lib/server');

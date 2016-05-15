
var config = require('../config');

var loadPlugin = function(pluginType, emitter, output) {
    try {
        var plugin = require('./plugins/' + pluginType);
    } catch (e) {
        console.error('invalid plugin'.red, pluginType);
        return;
    }

    plugin(emitter, output);
};

module.exports.loadAll = function(emitter, output) {
    config.plugins.forEach(function(plugin) {
        loadPlugin(plugin, emitter, output);
    });
};

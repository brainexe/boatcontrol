
var config = require('./config');

var loadPlugin = function(pluginType) {
    try {
        console.log('[Plugin] Start ' + pluginType);
        var plugin = require('./plugins/' + pluginType);
        plugin();
    } catch (e) {
        console.error('[Plugin] Invalid plugin'.red, pluginType, ": " + e);
    }
};

module.exports.loadAll = function() {
    if (!config.plugins) {
        return;
    }

    config.plugins.forEach(function(plugin) {
        loadPlugin(plugin);
    });
};

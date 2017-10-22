
var config = require('./config');

var loadPlugin = function(pluginType) {
    try {
        var plugin = require('./plugins/' + pluginType);
        plugin();
    } catch (e) {
        console.error('invalid plugin'.red, pluginType);
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

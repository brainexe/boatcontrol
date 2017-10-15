
var config = require('../config');

var loadPlugin = function(pluginType) {
    try {
        var plugin = require('./plugins/' + pluginType);
    } catch (e) {
        console.error('invalid plugin'.red, pluginType);
        return;
    }

    plugin();
};

module.exports.loadAll = function() {
    config.plugins.forEach(function(plugin) {
        loadPlugin(plugin);
    });
};

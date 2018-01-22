const config = require('./config');

const loadPlugin = function (pluginType) {
    try {
        console.log('[Plugin] Start ' + pluginType);
        let plugin = require('./plugins/' + pluginType);
        let promise = plugin();
        if (promise instanceof Promise) {
            promise.then(function () {
                console.log('[Plugin] Finished ' + pluginType);
            })
        }
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

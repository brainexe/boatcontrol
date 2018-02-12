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
        return promise;
    } catch (e) {
        console.error('[Plugin] Invalid plugin'.red, pluginType, ": " + e);
    }
};

module.exports.loadAll = function() {
    if (!config.plugins) {
        return;
    }

    let promises = [];
    config.plugins.forEach(function(plugin) {
        promises.push(loadPlugin(plugin));
    });

    return Promise.all(promises);
};

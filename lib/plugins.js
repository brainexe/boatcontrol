const config = require('./config');
require('colors');

const loadPlugin = function (pluginType, options) {
    try {
        console.log('[Plugin]'.green + ' Starting ' + pluginType);
        let plugin = require('./plugins/' + pluginType);
        let promise = plugin(options);
        if (promise instanceof Promise) {
            promise.then(function () {
                console.log('[Plugin]'.green + ' Finished ' + pluginType);
            })
        }
        return promise;
    } catch (e) {
        console.error('[Plugin]'.red + ' Invalid plugin'.red, pluginType, ": " + e);
    }
};

module.exports.loadAll = () => {
    let promises = [];

    for (let plugin in config.plugins) {
        let options = config.plugins[plugin];
        promises.push(loadPlugin(plugin, options));
    }

    return Promise.all(promises);
};

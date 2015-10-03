
// todo extract config

module.exports = function (config, input, output) {
    if (config.debug.controller) {
        require('./debug')(config, input, output);
    }

    require('./power')(config, input, output);
    require('./sound_light')(config, input, output);
    require('./water')(config, input, output);
    require('./generic')(config, input, output);
};


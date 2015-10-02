
module.exports = function (config, controller, output) {
    if (config.debug.controller) {
        require('./debug')(config, controller, output);
    }

    require('./power')(config, controller, output);
    require('./sound_light')(config, controller, output);
    require('./water')(config, controller, output);
    require('./generic')(config, controller, output);
};


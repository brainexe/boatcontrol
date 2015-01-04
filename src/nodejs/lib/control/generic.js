

module.exports = function (config, controller, output) {
    config.control.generic.forEach(function (generic) {

        var func = require('./generic/' + generic.type);

        func(generic, controller, output);
    });
};

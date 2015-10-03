

module.exports = function (config, input, output) {
    config.control.generic.forEach(function (generic) {

        var func = require('./generic/' + generic.type);

        func(generic, input, output);
    });
};

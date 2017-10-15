
var emitter = require('../emtter');

module.exports = function() {
    emitter.on(function (type, data) {
        console.log(type, data);
    });
};

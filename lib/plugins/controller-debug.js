
const emitter = require('../emitter');

module.exports = function() {
    emitter.on(function (type, data) {
        console.log(type, data);
    });
};

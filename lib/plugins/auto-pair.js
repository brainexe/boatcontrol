let exec = require('../util').exec;
const CHECK_INTERVAL = 5000;

module.exports = function() {
    setInterval(function () {
        exec(__dirname + '/../../scripts/sixpair');
    }, CHECK_INTERVAL);
};


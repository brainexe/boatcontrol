let exec = require('../util').exec;
const CHECK_INTERVAL = 10000;

module.exports = () => {
    setInterval(() => {
        exec(__dirname + '/../../scripts/sixpair');
    }, CHECK_INTERVAL);
};

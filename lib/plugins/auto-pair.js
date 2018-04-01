let exec = require('../util').exec;
const CHECK_INTERVAL = 5000;

module.exports = () => {
    setInterval(() => {
        exec(__dirname + '/../../scripts/sixpair');
    }, CHECK_INTERVAL);
};

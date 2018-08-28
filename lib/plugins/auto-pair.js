const exec = require('../util').exec;

module.exports = (options) => {
    const scanInterval = options.scanInterval || 10000;

    setInterval(() => {
        exec(__dirname + '/../../scripts/sixpair');
    }, scanInterval);
};

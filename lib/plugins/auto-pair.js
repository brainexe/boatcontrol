const exec = require('../util').exec;

// executes sixpair every X seconds until a controller connected
module.exports = (options) => {
    const scanInterval = options.scanInterval || 10000;

    // todo stop interval on connect
    setInterval(() => {
        console.log("[Plugin]".green, "Executing sixpair...");
        exec(__dirname + '/../../scripts/sixpair');
    }, scanInterval);
};

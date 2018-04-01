const process = require('process');

module.exports = function (pinConfig, input) {
    input.on(pinConfig.button + ":press", () => {
        console.log('Stop process...'.blue);
        process.exit(0);
    });
};

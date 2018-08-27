
const
    output = require('../output'),
    assert = require('assert');

module.exports = function(options) {
    assert(options.relayPin, "no relayPin defined");
    assert(options.relayDelay, "no relayDelay defined");

    let promise = Promise.resolve();
    if (options.relayPin && options.relayDelay)  {
        promise.then(() => {
            output.setDigital(options.relayPin, false);
        });

        promise = promise.delay(1000);
        promise.then(() => {
            output.setDigital(options.relayPin, true);
        });
        promise = promise.delay(options.relayDelay * 1000);
    }

    return promise;
};


const
    output = require('../output'),
    input  = require('../input'),
    assert = require('assert');

module.exports = options => {
    assert(options.relayPin, "no relayPin defined");
    assert(options.relayDelay, "no relayDelay defined");
    assert(options.restartButton, "no restartButton defined");

    /**
     * @returns {Promise<void>}
     */
    function restart() {
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
    }

    input.on(`${options.restartButton}:press`, () => {
        let promise = restart();
        promise.then();
    });

    return restart();
};

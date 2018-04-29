const assert = require('assert');
const exec   = require('../util').exec;

module.exports = function(options) {
    assert(options.cmd, "cmd needs to be passed");

    return exec(options.cmd);
};

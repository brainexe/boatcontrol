const assert = require('assert');
const exec   = require('../util').exec;

// executes any command on startup
module.exports = options => {
    assert(options.cmd, "cmd needs to be passed");

    return exec(options.cmd);
};

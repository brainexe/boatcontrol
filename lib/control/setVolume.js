const assert = require('assert'),
      input  = require('../input'),
      exec   = require('../util').exec;

const PLUS  = 'amixer -q sset Master 25%+';
const MINUS = 'amixer -q sset Master 25%-';

// play a sound file when a button was pressed
module.exports = (options) => {
    assert(options['button+'], "no button+ defined");
    assert(options['button-'], "no button- defined");

    input.on(options['button-'] + ":press", () => {
        exec(MINUS);
    });
    input.on(options['button+'] + ":press", () => {
        exec(PLUS);
    });
};

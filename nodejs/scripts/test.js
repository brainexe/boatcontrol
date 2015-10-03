var Emitter = require('events').EventEmitter,
    config  = require("../lib/config"),
    output  = require("../lib/output");

var emitter = require('../lib/input')();
var control = require('../lib/control');

control.loadAll(emitter, output);

emitter.emit('left:move', {x: 12, y:31});

var config  = require("../lib/config");
var output  = require("../lib/output");
var Emitter = require('events').EventEmitter;

var emitter = require('../lib/input')();

var control = require('../lib/control/all');
control(config, emitter, output);

emitter.emit('left:move', {x: 12, y:31});

var config  = require("../lib/config");
var output  = require("../lib/output");
var Emitter = require('events').EventEmitter;

require('colors');

var controller = new Emitter();

require('./lib/control/all')(config, controller, output);

console.log('started...'.green);

controller.emit('left:move', {x: 12, y:31});

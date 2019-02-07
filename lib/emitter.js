
const EventEmitter2 = require('eventemitter2').EventEmitter2;

module.exports = new EventEmitter2({
    maxListeners: 200,
    //wildcard: true, // todo check if it's useful
    //delimiter: ':',
});

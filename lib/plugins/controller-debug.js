
const emitter = require('../emitter');

// prints all controller events to console
module.exports = () => {
    emitter.on((type, data) => {
        console.log(type, data);
    });
};

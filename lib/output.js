
const config = require("./config");

function getOutput(type) {
    let output;
    switch (type) {
        case 'raspberry':
            output = new (require('./output/raspberry'))();
            break;
        case 'serial':
            output = new (require('./output/serial'))();
            break;
        default:
            throw "Invalid output type: ".error + type;
    }
    return output;
}

let output = {};
config.output.forEach(function(type) {
    output[type] = getOutput(type);
});

module.exports = output;

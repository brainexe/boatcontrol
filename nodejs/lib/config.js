require('colors');

var config;

try {
    config = require("../config");
} catch (e) {
    var fs = require('fs');
    fs.writeFileSync(__dirname + '/../config.js', fs.readFileSync(__dirname + '/../config.default.js'));
    fs.chmodSync(__dirname + '/../config.js', '666');

    config = require("../config");
    console.log("Created config.js out of config.default.json".green)
}

module.exports = config;

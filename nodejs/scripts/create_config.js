var fs          = require('fs'),
    path        = require('path'),
    raw_config  = require("../config"),
    i;
require('colors');

var max_pin = 1;
var pins = {};
var raw_pins = raw_config['pins'];
if (raw_pins['monitors']) {
    for (i in pins['monitors']) {
        raw_pins['monitor_' + i + '_v'] = raw_pins['monitors'][i]['vertical'];
        raw_pins['monitor_' + i + '_r'] = raw_pins['monitors'][i]['rotate'];
    }
}

for (i in raw_pins) {
    if (raw_pins[i].pin) {
        var new_pin = raw_pins[i];
        var pin_id = new_pin['pin'];
        delete new_pin['pin'];

        pins[pin_id] = new_pin;

        if (pin_id > max_pin) {
            max_pin = pin_id;
        }
    }
}

var config = {
    baud:  raw_config['serial_baud'],
    pins:  pins
};

var json = JSON.stringify(config).replace(/"/g, "'");

if (process.argv[2]) {
    var filename = process.argv[2];
    var targetFilename = path.dirname(filename) + '/tmp/tmp.ino';
    fs.readFile(filename, "utf8", function(err, data) {
        if (err) {
            throw err;
        }

        data = data.replace(/#define CONFIG ".*?"/, '#define CONFIG "' + json+ '"');
        data = data.replace(/#define DEBUG (false|true)/i, '#define DEBUG ' + (config.debug ? 'true' : 'false'));
        data = data.replace(/#define HASH_SIZE \d+/i, '#define HASH_SIZE ' + max_pin);

        fs.writeFile(targetFilename, data, function(err) {
            if (err) {
                throw err;
            }
            console.log('done!');
        });
    });
}

console.log("config:" + json.green);

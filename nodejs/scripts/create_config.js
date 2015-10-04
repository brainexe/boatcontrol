var fs         = require('fs'),
    path       = require('path'),
    raw_config = require("../lib/config"),
    i;

require('colors');

var max_pin = 1;
var pins = {};
var raw_pins = raw_config['pins'];

for (i in raw_pins) {
    if (raw_pins[i].pin) {
        var new_pin = raw_pins[i];

        var pinIds = [];
        ['pin', 'pinRotate', 'pinVertical'].forEach(function(pinType) {
            if (new_pin[pinType]) {
                pinIds.push(new_pin[pinType]);
                delete(new_pin[pinType]);
            }
        });

        delete new_pin['pin'];
        delete new_pin['type'];
        delete new_pin['subType'];
        delete new_pin['joystick'];
        delete new_pin['button'];

        pinIds.forEach(function(pinId) {
            savePin(pinId, new_pin);
        });

        function savePin(pin_id, pin) {
            pins[pin_id] = pin;

            if (pin_id > max_pin) {
                max_pin = pin_id;
            }
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

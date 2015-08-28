#!/bin/sh

cd `dirname $0`

# set config
cd ../nodejs
node create_config.js ../arduino/arduino.ino
chmod 777 ../arduino/arduino.ino

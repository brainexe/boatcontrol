#!/bin/sh

cd `dirname $0`

cd ../nodejs

node create_config.js ../arduino/arduino.ino

# todo compile
# todo upload


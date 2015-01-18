#!/bin/sh

cd `dirname $0`

./set_config.sh

# compile + upload
cd ../arduino
arduino arduino.ino --upload --port /dev/ttyUSB*

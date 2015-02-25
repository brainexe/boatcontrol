#!/bin/sh

sh ./set_config.sh

cd `dirname $0`

./set_config.sh

DEVICE=$(ls /dev/ttyUSB*)

# compile + upload
cd ../arduino
arduino arduino.ino --upload --port $DEVICE

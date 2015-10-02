#!/bin/sh

sh ./set_config.sh

cd `dirname $0`

DEVICE=$(ls /dev/ttyUSB*)

# compile + upload
cd ../arduino/tmp
~/Downloads/arduino-1.6.5-r5/arduino tmp.ino --upload --port $DEVICE

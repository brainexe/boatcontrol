#!/bin/sh

sh ./set_config.sh

cd `dirname $0`

DEVICE=$(ls /dev/ttyUSB* /dev/ttyACM*)

# compile + upload
cd ../arduino/tmp
arduino tmp.ino --upload --port $DEVICE

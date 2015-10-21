#!/bin/sh

sh ./set_config.sh

cd `dirname $0`

DEVICE=$(ls /dev/ttyUSB* /dev/ttyACM*)

# compile + upload
cd ../nodejs/node_modules/duino/src
arduino du.ino --upload --port $DEVICE

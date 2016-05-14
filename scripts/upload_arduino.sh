#!/bin/sh

cd `dirname $0`
cd ..

DEVICE=$(ls /dev/ttyUSB* /dev/ttyACM*)

# compile + upload
cd node_modules/duino/src
arduino du.ino --upload --port $DEVICE

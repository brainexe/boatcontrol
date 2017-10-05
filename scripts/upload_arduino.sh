#!/bin/sh

cd `dirname $0`
cd ..

DEVICE=$(ls /dev/ttyACM*)

# compile + upload
arduino --upload node_modules/duino/src/duinolight/duinolight.ino --port $DEVICE -v

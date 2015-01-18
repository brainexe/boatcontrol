#!/bin/sh

cd `dirname $0`

sudo sixad --stop
sudo sixad --start &

while [ ! -e /dev/input/js0 ] ;
do
      sleep 1
      echo "wait for controller..."
done

cd ../nodejs
sudo node index

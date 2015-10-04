#!/bin/sh

cd `dirname $0`

if [ ! -e /dev/input/js0 ] ; then
  sudo sixad --stop
  sudo sixad --start &

  sleep 1

  while [ ! -e /dev/input/js0 ] ;
  do
    sleep 1
    echo ".\c"
  done
  echo ""
fi
echo "Controller connected!"

cd ../nodejs
sudo node index

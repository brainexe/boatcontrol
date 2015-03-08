#!/bin/sh

cd `dirname $0`

if [ ! -e /dev/input/js0 ] ; then
  sudo /opt/sixpair/QtSixA-1.5.1/sixad/sixad --stop
  sudo /opt/sixpair/QtSixA-1.5.1/sixad/sixad --start &

  sleep 1

  while [ ! -e /dev/input/js0 ] ;
  do
    sleep 1
    echo ".\c"
  done
fi

cd ../nodejs
sudo node index

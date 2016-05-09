#!/bin/sh

out() {
   echo $1
   espeak "$1" -v en -s 120 2> /dev/null
}

out "Starting"

cd `dirname $0`
cd ..

if [ ! -e /dev/input/js0 ] ; then
  sudo sixad --stop
  sudo sixad --start &

  sleep 1

  out "Press PS button."

  i=0
  while [ ! -e /dev/input/js0 ] && [ $i -lt 10 ] ;
  do
    let i=$i+1
    sleep 1
    echo ".\c"
  done
  echo ""
fi

out "Controller connected"

sudo node index.js

out "Stopped Server"

#!/bin/sh

out() {
   echo $1
   espeak "$1" -v en -s 120
}

out "Starting. Please wait."

cd `dirname $0`

if [ ! -e /dev/input/js0 ] ; then
  sudo sixad --stop
  sudo sixad --start &

  sleep 1

  out "Press PS button."

  while [ ! -e /dev/input/js0 ] ;
  do
    sleep 1
    echo ".\c"
  done
  echo ""
fi

out "Controller connected. Starting server"

cd ../nodejs

node scripts/start_server.js &
sudo node index

out "Stopped Server"

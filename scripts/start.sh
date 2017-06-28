#!/bin/bash

cd `dirname $0`

. _common.sh

checkRoot

out() {
   cecho y "$1"
   espeak "$1" -v en -s 120 2> /dev/null
}

out "Starting"

if [ ! -e /dev/input/js0 ] ; then
  sudo ../sixad/sixad --stop --start --boot-yes

  sleep 1

  out "Press PS button."

  i=0
  while [ ! -e /dev/input/js0 ] && [ $i -lt 10 ] ;
  do
    let i=$i+1
    sleep 1
    echo -e ".\c"
  done
  echo ""
fi

if [ ! -e /dev/input/js0 ] ; then
    out "No controller connected"
else
    out "Controller connected"
fi

cd ..
./node_modules/pm2/bin/pm2 restart pm2.json

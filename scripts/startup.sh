#!/bin/sh

DIR="/www/boatcontrol/scripts"

sleep 5

espeak "booting"

./pair.sh

pm2 start ./start.sh
pm2 start ./server.sh

espeak "started"

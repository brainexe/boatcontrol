#!/bin/bash

set +ex

cd `dirname $0`
. _common.sh
cd ..

checkRoot

./node_modules/pm2/bin/pm2 delete all
./node_modules/pm2/bin/pm2 restart .pm2.json

sleep 2

./node_modules/pm2/bin/pm2 status

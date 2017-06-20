#!/bin/bash

set +ex

cd `dirname $0`
. _common.sh
cd ..

./node_modules/pm2/bin/pm2 delete all

cecho g "Stopped"

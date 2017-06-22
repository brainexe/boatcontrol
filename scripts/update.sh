#!/bin/bash

cd `dirname $0`
cd ..

. ./scripts/_common.sh

#cecho y "Updating git..."
#git pull --autostash
git submodule update --init
git submodule add https://github.com/RetroPie/sixad.git sixad

cecho y "Updating browser dependencies..."
./node_modules/bower/bin/bower install \
    -q --allow-root --config.directory=browser/vendor

cecho y "Update nodejs dependencies..."
npm set progress=false
NODE_ENV=production npm install -q

cd scripts

cecho y "Install sixpair..."
gcc -o sixpair sixpair.c -lusb > /dev/null

cecho y "Install sixad..."
cd ../sixad
make > /dev/null
make install > /dev/null
make clean > /dev/null

cecho g "Done!"

#!/bin/bash

set -e

cd `dirname $0`
cd ..

. ./scripts/_common.sh

cecho y "Updating git..."
git pull --rebase --autostash
git submodule update --init
git submodule add https://github.com/RetroPie/sixad.git sixad || test 1

cecho y "Update nodejs dependencies..."
npm set progress=false
NODE_ENV=production npm install -q --progress=false

cecho y "Updating browser dependencies..."
./node_modules/bower/bin/bower install \
    -q --allow-root --config.directory=browser/vendor

cd scripts

cecho y "Install sixpair..."
gcc -o sixpair sixpair.c -lusb > /dev/null

cecho y "Install sixad..."

cd ../sixad
sudo make > /dev/null
sudo make install > /dev/null
sudo make clean > /dev/null

cecho g "Done!"

#!/bin/bash

cd `dirname $0`
cd ..

. ./scripts/_common.sh

UPDATE_GIT=true
while getopts "d:" opt; do
    case "$opt" in
        d)  UPDATE_GIT=false
        ;;
    esac
done

cecho y "Updating git..."
git pull --autostash
git submodule update --init
git submodule add https://github.com/RetroPie/sixad.git sixad

cecho y "Updating browser dependencies..."
./node_modules/bower/bin/bower install --allow-root --config.directory=browser/vendor

cecho y "Update nodejs dependencies..."
npm set progress=false
NODE_ENV=production npm install -q

cd scripts

cecho y "Install sixpair..."
gcc -o sixpair sixpair.c -lusb

cecho y "Install sixad..."
cd ../sixad
sudo make
sudo make install

cecho g "done!"

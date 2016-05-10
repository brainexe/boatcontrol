#!/bin/bash

cd `dirname $0`
cd ..

echo "Updating git..."
git stash -q
git pull
git submodule update --init
git submodule add https://github.com/RetroPie/sixad.git sixad
git stash pop -q

echo "Updating browser dependencies..."
bower install --allow-root --config.directory=browser/vendor

echo "Update nodejs dependencies..."
npm set progress=false
NODE_ENV=production npm install -q

cd scripts

echo "Install sixpair..."
gcc -o sixpair sixpair.c -lusb

echo "Install sixad..."
cd ../sixad
sudo make
sudo make install

echo "done!"

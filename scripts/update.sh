#!/bin/bash

cd `dirname $0`
cd ..

echo "Updating git..."
git stash -q
git pull
git stash pop -q

echo "Updating browser dependencies..."
bower install --allow-root --config.directory=browser/vendor

echo "update nodejs dependencies..."
npm set progress=false
NODE_ENV=production npm install

cd scripts

echo "Install sixad"
gcc -o sixpair sixpair.c -lusb

echo "done!"

#!/bin/sh

cd `dirname $0`
cd ..

echo "Update git..."
git stash
git pull
git stash pop

echo "Updating browser dependencies..."
bower update --allow-root

echo "update nodejs dependencies..."
npm install -g bower  pm2
npm update

echo "done!"

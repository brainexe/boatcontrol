#!/bin/sh

cd `dirname $0`

cd ..

git stash
git pull
git stash pop

bower update --allow-root

cd nodejs
npm update

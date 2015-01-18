#!/bin/sh

cd `dirname $0`

cd ..

git stash
git pull
git stash pop

cd nodejs
npm update

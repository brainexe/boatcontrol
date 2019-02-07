#!/bin/bash

set -e

cd `dirname $0`
cd ..

. ./scripts/_common.sh

/etc/init.d/supervisor stop boat || test 1

cecho y "Updating git..."
git pull --rebase --autostash
git submodule update --init
git submodule add https://github.com/RetroPie/sixad.git sixad || test 1

# compile/install/download a bunch of stuff
make

cd scripts

cecho y "Install sixad..."
cd ../sixad
sudo make > /dev/null
sudo make install > /dev/null
sudo make clean > /dev/null

/etc/init.d/supervisor restart boat

cecho g "Done!"

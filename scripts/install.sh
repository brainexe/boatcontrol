#!/bin/bash

set -e

cd `dirname $0`

. _common.sh

checkRoot

cecho y "Updating package list..."
sudo apt-get update -y -q

cecho y "Upgrading system..."
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y

cecho y "Install main packages..."
apt-get install -y git \
        mpg123 espeak supervisor \
        libusb-dev libusb-0.1-4 libusb-1.0-0-dev libbluetooth-dev libudev-dev \
        joystick dstat i2c-tools

apt install gcc-4.9 g++-4.9 && export CXX=g++-4.9

# install golang
FileName="go1.12.9.linux-armv6l.tar.gz"
wget https://dl.google.com/go/$FileName
sudo tar -C /usr/local -xvf $FileName

cat >> ~/.bashrc << 'EOF'
export GOPATH=$HOME/go
export PATH=/usr/local/go/bin:$PATH:$GOPATH/bin
EOF
source ~/.bashrc

git config --global user.email "boat@example.com"
git config --global user.name "boat"

cecho y "Install bluez..."
sudo apt-get install -y bluez-tools bluez-hcidump

cecho y "Install submodules..."
git submodule init
git submodule update

cecho y "Install nodejs..."
sudo apt-get install -y nodejs npm
npm config set prefix '~/.npm-global'

cecho y "Setup supervisor..."
rm -rf /etc/supervisor/conf.d/boat.conf
ln -s $(pwd)/../docs/supervisord.conf /etc/supervisor/conf.d/boat.conf
/etc/init.d/supervisor restart
supervisorctl status

./update.sh

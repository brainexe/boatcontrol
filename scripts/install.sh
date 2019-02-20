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
sudo apt-get autoclean -y

cecho y "Install main packages..."
apt-get install -y git \
        mpg123 espeak libttspico-utils supervisor \
        libusb-dev libusb-0.1-4 libusb-1.0-0-dev libbluetooth-dev \
        joystick dstat i2c-tools \
        gcc gcc-avr avr-libc avrdude

# install golang
FileName="go1.11.1.linux-armv6l.tar.gz"
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

cecho y "Install nodejs..."
sudo apt-get install -y nodejs npm

cecho y "Setup supervisor..."
rm -rf /etc/supervisor/conf.d/boat.conf
ln -s $(pwd)/../docs/supervisord.conf /etc/supervisor/conf.d/boat.conf
/etc/init.d/supervisor restart
supervisorctl status

./update.sh

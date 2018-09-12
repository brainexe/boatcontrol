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
apt-get install -y git espeak \
        mpg123 espeak \
        libusb-dev libusb-dev libusb-0.1-4 libbluetooth-dev \
        joystick \
        gcc gcc-avr avr-libc avrdude

git config --global user.email "boat@example.com"
git config --global user.name "boat"


cecho y "Install bluez..."
sudo apt-get install -y bluez-utils bluez-hcidump

cecho y "Install nodejs..."
sudo apt-get install nodejs npm

cd -

./update.sh

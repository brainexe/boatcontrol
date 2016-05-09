#!/bin/sh

cd `dirname $0`

# todo install sixiad

echo "Updating system..."
sudo apt-get update -y
sudo apt-get upgrade -y

echo "Install main packages..."
apt-get install -y git espeak  libusb-dev libusb-dev libusb-0.1-4 libbluetooth-dev joystick redis-server gcc gcc-avr avr-libc avrdude

echo "Install bluez..."
sudo apt-get install -y bluez-utils bluez-compat bluez-hcidump

echo "Install sixad..."
gcc -o sixpair sixpair.c -lusb

echo "Install nodejs..."
sudo apt-get install nodejs npm node-semver wget  checkinstall
cd /opt && wget http://node-arm.herokuapp.com/node_latest_armhf.deb && dpkg -i node_latest_armhf.deb

cd -

echo "Install nodejs dependencies..."
npm set progress=false
NODE_ENV=production npm install -g bower pm2
NODE_ENV=production npm install


bower install


#!/bin/sh

echo "update packages...may take some time"
apt-get update -y
apt-get upgrade -y

echo "install main packages"
apt-get install -y git wget gcc bluez-utils bluez-compat bluez-hcidump checkinstall libusb-dev libbluetooth-dev joystick

echo "install nodejs"
apt-get install nodejs npm node-semver -y
cd /opt && wget http://node-arm.herokuapp.com/node_latest_armhf.deb && dpkg -i node_latest_armhf.deb

echo "move /opt directory"
mv /www/boatcontrol/sdcard/opt/* /opt/ -f

ln -s /opt/sixpair/sixpair /user/bin

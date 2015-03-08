#!/bin/sh

apt-get install puppet -y

#puppet module install puppetlabs-stdlib --force
#puppet module install puppetlabs-apt --force
#puppet module install maestrodev-wget --force
#puppet module install maestrodev-ssh_keygen --force

sh run.sh

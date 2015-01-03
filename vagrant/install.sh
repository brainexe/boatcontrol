#!/bin/sh

apt-get install puppet -y

#puppet module install puppetlabs-vcsrepo --force
#puppet module install puppetlabs-concat --force
#puppet module install puppetlabs-stdlib --force
#puppet module install puppetlabs-apt --force
#puppet module install puppetlabs-java --force

#puppet module install maestrodev-wget --force
#puppet module install maestrodev-ssh_keygen --force
#puppet module install willdurand-composer --force
#puppet module install jproyo-archive --force

sh run.sh

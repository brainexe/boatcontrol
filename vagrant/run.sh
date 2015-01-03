#!/bin/sh

sudo cp *.yaml /etc/puppet/
sudo puppet apply --modulepath ./modules:/etc/puppet/modules manifests/site.pp

#!/bin/sh

sudo puppet apply --modulepath ./modules:/etc/puppet/modules manifests/default.pp

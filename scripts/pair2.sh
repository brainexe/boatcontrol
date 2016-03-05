#!/bin/sh

sudo /etc/init.d/bluetooth stop
sudo killall hcid hidd
hidd --server --nocheck -n

# sudo /etc/init.d/bluetooth start

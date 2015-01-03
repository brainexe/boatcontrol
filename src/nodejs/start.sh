#!/bin/sh

sudo sixad --stop
sudo sixad --start &

sudo node index

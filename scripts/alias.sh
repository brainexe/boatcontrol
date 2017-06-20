#!/bin/bash

BOAT_DIR=$(dirname $(dirname $(readlink -e $0)))

alias boat="cd $BOAT_DIR"
alias pairController="cd $BOAT_DIR/scripts; ./pair.sh"
alias updateBoatControl="cd $BOAT_DIR/scripts; ./update.sh"
alias uploadArduino="cd $BOAT_DIR/scripts; ./upload_arduino.sh"
alias startController="cd $BOAT_DIR/scripts; ./start.sh"
alias startServer="cd $BOAT_DIR/scripts; ./server.sh"
alias stopServer="cd $BOAT_DIR/scripts; ./stop.sh"
alias pm2="cd $BOAT_DIR; ./node_modules/pm2/bin/pm2"

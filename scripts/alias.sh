#!/bin/bash

if [[ ! $BOAT_DIR ]]; then
    BOAT_DIR=$(dirname $(dirname $(readlink -e $0)))
fi

alias boat="cd $BOAT_DIR"
alias pairController="cd $BOAT_DIR/scripts; sudo ./pair.sh"
alias uploadArduino="cd $BOAT_DIR/scripts; ./upload_arduino.sh"
alias boatUpdate="cd $BOAT_DIR/scripts; sudo ./update.sh"
alias boatRepo="cd $BOAT_DIR; git pull --autostash"
alias boatStart="cd $BOAT_DIR/scripts; sudo ./start.sh"
alias boatStop="cd $BOAT_DIR/scripts; sudo ./stop.sh"
alias boatRestart="cd $BOAT_DIR/scripts; sudo ./restart.sh"

#!/bin/sh

DIR=`realpath "$(dirname $0)/.."`

alias boat="cd $DIR"
alias pairController="cd $DIR; cd scripts; ./pair.sh"
alias updateBoatControl="cd $DIR; cd scripts; ./update.sh"
alias uploadArduino="cd $DIR; cd scripts; ./upload_arduino.sh"
alias startController="cd $DIR; cd nodejs/scripts; node ./start_server.js"
alias startServer="cd $DIR; cd scripts; ./start.sh"
alias config="cd $DIR; cd scripts; ./set_config.sh"
alias stop="cd $DIR; cd scripts; ./stop.sh"
alias install="cd $DIR; cd scripts; ./install.sh"

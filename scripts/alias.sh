#!/bin/bash

if [[ ! $BOAT_DIR ]]; then
    BOAT_DIR=$(dirname $(dirname $(readlink -e $0)))
fi

alias boat="cd $BOAT_DIR"
alias pairController="sudo $BOAT_DIR/pair.sh"
alias boatUpdate="cd $BOAT_DIR/scripts; sudo ./update.sh"
alias boatRepo="cd $BOAT_DIR; git pull --rebase --autostash"

alias boatStatus="cd $BOAT_DIR/scripts; supervisorctl status boat"
alias boatStart="cd $BOAT_DIR/scripts; supervisorctl start boat"
alias boatStop="cd $BOAT_DIR/scripts; supervisorctl stop boat"
alias boatRestart="cd $BOAT_DIR/scripts; supervisorctl restart boat"

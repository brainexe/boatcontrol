#!/bin/sh

kill $(ps aux | grep 'sh start.sh' | awk '{print $2}')
sleep 2
kill -9 $(ps aux | grep 'sh start.sh' | awk '{print $2}')

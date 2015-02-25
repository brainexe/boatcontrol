#!/bin/sh

kill -9 $(ps aux | grep 'sh start.sh' | awk '{print $2}')

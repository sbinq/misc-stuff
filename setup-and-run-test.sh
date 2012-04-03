#!/bin/bash

# shards
mkdir mongo1 && mongod --shardsvr --dbpath mongo1/ --smallfiles --noprealloc --port 30000 > mongo1.log &
mkdir mongo2 && mongod --shardsvr --dbpath mongo2/ --smallfiles --noprealloc --port 30100 > mongo2.log &

# config server
mkdir configdb1 && mongod --configsvr --dbpath configdb1/ --smallfiles --noprealloc --port 50000 > mongoconfigsvr1.log &

# mongos
read -p "Press enter when config server is up to launch mongos.. "
mongos --configdb localhost:50000 --port 55000 > mongos1.log &

read -p "Press enter when mongos is up to add shards.. "
mongo --port 55000 add-shards.js

read -p "Press enter when ready to execute test.. "
mongo --port 55000 test.js

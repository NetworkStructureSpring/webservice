#!/bin/bash
cd /home/ec2-user/webservice
sudo pm2 kill
sudo pm2 startOrReload Config.js
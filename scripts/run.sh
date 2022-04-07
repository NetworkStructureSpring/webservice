#!/usr/bin/env bash
cd /home/ec2-user/webservice
sudo pm2 kill
sudo npm i
# sudo pm2 start server.js
sudo pm2 start ecosystem.config.json
sudo pm2 save
sudo pm2 startup systemd --service-name myapp
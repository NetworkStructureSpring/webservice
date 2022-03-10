#! /bin/bash

curl --silent --location https://rpm.nodesource.com/setup_17.x | sudo bash -
sudo yum install -y nodejs
sudo node -v
sudo unzip webservice.zip -d webservice
sudo ls -al
cd webservice
sudo ls -al
 npm i -g pm2
 pm2 start server.js
 pm2 startup systemd
 pm2 save
 pm2 list

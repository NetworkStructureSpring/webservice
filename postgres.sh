#! /bin/bash
curl --silent --location https://rpm.nodesource.com/setup_17.x | sudo bash -
sudo yum install -y nodejs
sudo node -v
sudo unzip webservice.zip -d webservice
sudo ls -al
cd webservice
sudo ls -al
sudo npm i -g pm2
sudo pm2 start server.js
sudo pm2 startup systemd
sudo pm2 save
sudo pm2 list

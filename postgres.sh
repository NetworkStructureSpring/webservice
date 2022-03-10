#! /bin/bash

curl --silent --location https://rpm.nodesource.com/setup_17.x | sudo bash -
sudo yum install -y nodejs
sudo node -v
sudo unzip webservice.zip -d webservice
sudo ls -al
cd ~/webservice

sudo npm install pm2@latest -g
sudo pm2 startup systemd --service-name myapp
sudo pm2 start server.js
sudo pm2 save
# sudo ls -al
# sudo node server.js
# sudo npm i -g pm2
# sudo pm2 start server.js
# sudo pm2 startup systemd
# sudo pm2 save
# sudo pm2 list

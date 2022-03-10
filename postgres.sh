#! /bin/bash

curl --silent --location https://rpm.nodesource.com/setup_17.x | sudo bash -
sudo yum install -y nodejs
sudo node -v
sudo unzip webservice.zip -d webservice
sudo ls -al
cd webservice
# sudo ls -al
# sudo node server.js
# sudo npm i -g pm2
# sudo pm2 start server.js
# sudo pm2 startup systemd
# sudo pm2 save
# sudo pm2 list
npm install pm2 -g
sleep 15
sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v17.7.0/bin /home/ec2-user/.nvm/versions/node/v17.7.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
sudo pm2 start server.js
sudo pm2 startup
sudo pm2 save
sudo pm2 list
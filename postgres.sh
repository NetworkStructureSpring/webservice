#! /bin/bash
# curl --silent --location https://rpm.nodesource.com/setup_17.x | sudo bash -
# sudo yum install -y nodejs
# sudo node -v
# sudo unzip webservice.zip -d webservice
# sudo ls -al
# cd ~/webservice

# sudo npm install pm2@latest -g
# sudo pm2 startup systemd --service-name myapp
# sudo pm2 start server.js
# sudo pm2 save


sudo yum update
sudo yum install ruby
sudo yum install wget
#! /bin/bash
# CODEDEPLOY_BIN="/opt/codedeploy-agent/bin/codedeploy-agent"
# $CODEDEPLOY_BIN stop
# yum erase codedeploy-agent -y
cd /home/ec2-user
sudo wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
sudo ln -s /usr/local/bin/ruby /usr/bin/ruby
sudo chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent start
sudo service codedeploy-agent status




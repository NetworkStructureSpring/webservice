#! /bin/bash
curl --silent --location https://rpm.nodesource.com/setup_17.x | sudo bash -
sudo yum install -y nodejs
sudo node -v
sudo unzip webservice.zip -d webservice
sudo ls -al
cd ~/webservice
sudo npm install pm2@latest -g

sudo yum update
sudo yum install wget ruby -y
CODEDEPLOY_BIN="/opt/codedeploy-agent/bin/codedeploy-agent"
$CODEDEPLOY_BIN stop
yum erase codedeploy-agent -y
cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent start
sudo service codedeploy-agent status
sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
#sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:./Config.json




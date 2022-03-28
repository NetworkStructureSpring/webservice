#!/bin/bash
curl --silent --location https://rpm.nodesource.com/setup_17.x | sudo bash -
yum install -y nodejs
node -v
npm install pm2@latest -g
pm2 update
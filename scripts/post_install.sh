#!/bin/bash
cd /home/ec2-user/webapp
sudo pm2 startup systemd --service-name myapp
#!/usr/bin/env bash
cd /home/ec2-user/webservice
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:./Config.json

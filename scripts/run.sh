#!/usr/bin/env bash
cd /home/ec2-user/webapp
pm2 kill
pm2 start server.js
pm2 save
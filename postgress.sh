#! /bin/bash
sudo ls -al
sudo yum update -y
sudo amazon-linux-extras install postgresql9.6
sudo tee /etc/yum.repos.d/pgdg.repo<<EOF
[pgdg13]
name=PostgreSQL 13 for RHEL/CentOS 7 - x86_64
baseurl=https://download.postgresql.org/pub/repos/yum/13/redhat/rhel-7-x86_64
enabled=1
gpgcheck=0
EOF
sudo yum install postgresql13 postgresql13-server -y
sudo /usr/pgsql-13/bin/postgresql-13-setup initdb

sudo systemctl stop postgresql-13.service
sudo systemctl start postgresql-13.service
sudo systemctl enable postgresql-13.service
sudo systemctl status postgresql-13.service

sudo -u postgres bash -c "psql -c \"ALTER USER postgres with PASSWORD '123Fall@2021';\""

sudo systemctl stop postgresql-13.service
sudo systemctl start postgresql-13.service
sudo systemctl status postgresql-13.service

curl --silent --location https://rpm.nodesource.com/setup_17.x | sudo bash -
sudo yum install -y nodejs
sudo node -v
sudo unzip webservice.zip -d webservice
sudo ls -al
cd webservice
sudo ls -al
sudo pm2 start webservice/app/app.js
sudo pm2 startup systemd
sudo pm2 save
sudo pm2 list

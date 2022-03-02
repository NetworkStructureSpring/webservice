#! /bin/bash

sudo yum update -yum
sudo amazon-linux-extras install postgresql9.6
sudo tee /etc/yum.repos.d/pgdg.repo<<EOF
[pgdg13]
name=PostgreSQL 13 for RHEL/CentOS 7 - x86_64
baseurl=https://download.postgresql.org/pub/repos/yum/13/redhat/rhel-7-x86_64
enabled=1
gpgcheck=0
EOF
sudo yum install postgresql13 postgresql13-server -y
sudo /usr/pqsql-13/bin/postgresql-13-setup initdb

sudo systemctl stop postgresql-13.service
sudo systemctl start postgresql-13.service
sudo systemctl enable postgresql-13.service
sudo systemctl status postgresql-13.service

sudo -u postgres psql <<EOF
          \x
          ALTER ROLE postgres WITH PASSWORD '123Fall@2021';
          CREATE DATABASE "UserAccount";
          \q
EOF

sudo systemctl stop postgresql-13.service
sudo systemctl start postgresql-13.service
sudo systemctl status postgresql-13.service




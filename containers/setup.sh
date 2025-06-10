#!/bin/bash
# install deps
yum update -y
yum install -y git

amazon-linux-extras install docker -y
service docker start
usermod -a -G docker ec2-user

# install Docker Compose v2
curl -L \
  "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# clone and run the app
cd /home/ec2-user
git clone https://github.com/stefanfaur/labs2025-docker.git
cd labs2025-docker
git checkout deployment
cd containers
docker-compose -f docker-compose.deploy.yaml up -d


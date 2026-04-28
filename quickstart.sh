#!/bin/sh

docker buildx build \
    -f ./backend/Dockerfile \
    -t nf-vault-backend ./backend 
docker buildx build \
    -f ./frontend/Dockerfile \
    -t nf-vault-frontend ./frontend 
docker stack deploy -c docker-compose.yaml nfVault

# docker stack rm nfVault
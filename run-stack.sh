#!/bin/bash

docker build -t cc-frontend-rcatrangiu ./frontend
docker build -t cc-backend-rcatrangiu ./backend
docker build -t cc-image-service-rcatrangiu ./image-service

docker stack deploy -c docker-compose.yaml cc
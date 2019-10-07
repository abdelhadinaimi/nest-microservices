#!/bin/sh

export CONTAINER_COMMAND_NODE="npm run start"
export REDDIT_HOST="redis"

docker-compose up --build
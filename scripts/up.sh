#!/bin/sh

export CONTAINER_COMMAND_NODE="npm run start"
export AMQ_HOST="rabbitmq"

docker-compose up --build
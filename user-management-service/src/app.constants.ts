import { config } from "dotenv";
import { Logger } from "@nestjs/common";

try {
  if(process.env.NODE_ENV !== 'production'){
    config();
  }
} catch (e) {
  Logger.error(`.env file doens't exist please add it.`);
}

export const AMQ = {
  PROXY_NAME: 'AMQ_PROXY',
  HOST: process.env.AMQ_HOST || 'localhost',
  PORT: process.env.AMQ_PORT || 5672,
  USER: process.env.AMQ_USER || 'user_service',
  PASS: process.env.AMQ_PASSWORD || 'user_service',
}

export const REDIS = {
  PROXY_NAME: 'REDIS_PROXY',
  HOST: process.env.REDIS_HOST || 'localhost',
  PORT: process.env.REDIS_PORT || 6379,
}

export const MONGO = {
  HOST: process.env.MONGO_HOST || 'localhost',
  PORT: process.env.MONGO_PORT || '27018',
  USER: process.env.MONGO_USER || 'users_user',
  PASS: process.env.MONGO_PASS || 'users_pass',
}


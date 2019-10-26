export const AMQ = {
  PROXY_NAME: 'AMQ_PROXY',
  HOST: process.env.AMQ_HOST || 'localhost',
  PORT: process.env.AMQ_PORT || 5672,
  USER: process.env.AMQ_USER || 'user',
  PASS: process.env.AMQ_PASSWORD || 'bitnami',
}

export const REDIS = {
  PROXY_NAME: 'REDIS_PROXY',
  HOST: process.env.REDIS_HOST || 'localhost',
  PORT: process.env.REDIS_PORT || 6379,
}


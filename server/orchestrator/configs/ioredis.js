const Redis = require("ioredis");
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME,
});

module.exports = redis;
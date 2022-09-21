import Queue from "bull";
import dotenv from "dotenv";

dotenv.config();

const opts = {
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
};

const queueConnection = (name) => {
  return new Queue(name, opts);
};

export default queueConnection;

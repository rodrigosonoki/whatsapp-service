import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const opts = {
  baseURL: process.env.ZAPI_BASE_URL,
};

export const messageService = axios.create(opts);

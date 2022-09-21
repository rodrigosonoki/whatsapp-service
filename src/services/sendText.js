import { messageService } from "../infra/messageService.js";
import dotenv from "dotenv";

dotenv.config();

const sendText = async (message) => {
  const opts = {
    phone: process.env.PHONE,
    message,
  };
  try {
    const response = await messageService.post("/send-text", opts);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default sendText;

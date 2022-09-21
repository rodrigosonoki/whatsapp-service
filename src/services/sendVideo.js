import { messageService } from "../infra/messageService.js";
import dotenv from "dotenv";

dotenv.config();

const sendVideo = async (video) => {
  const opts = {
    phone: process.env.PHONE,
    video,
  };
  try {
    await messageService.post("send-video", opts);
    console.log(`Video ${video} sent to Alfred.`);
  } catch (err) {
    console.log(err);
  }
};

export default sendVideo;

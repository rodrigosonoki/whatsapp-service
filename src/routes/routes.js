import { Router } from "express";
import sendText from "../services/sendText.js";
import sendVideo from "../services/sendVideo.js";
import auth from "../middleware/auth.js";
import phoneCheck from "../middleware/phoneCheck.js";
import queueConnection from "../infra/queueConnection.js";
import dotenv from "dotenv";

dotenv.config();

const routes = Router();
const videoServerQueue = queueConnection(process.env.MESSAGE_QUEUE);

routes.post("/send-text", auth, async (req, res) => {
  const { text } = req.body;

  try {
    await sendText(text);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

routes.post("/send-video", auth, async (req, res) => {
  const { video } = req.body;

  try {
    await sendVideo(video);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

routes.post("/webhook", phoneCheck, async (req, res) => {
  const message = req.body.text;
  try {
    videoServerQueue.add(message);
    console.log("Job added to queue!");
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

export default routes;

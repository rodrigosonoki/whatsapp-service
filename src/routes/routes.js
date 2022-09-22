import { Router } from "express";
import sendText from "../services/sendText.js";
import sendVideo from "../services/sendVideo.js";
import auth from "../middleware/auth.js";
import webhookAuth from "../middleware/webhookAuth.js";
import buildWebhookRequest from "../middleware/buildWebhookRequest.js";
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

routes.post("/webhook", webhookAuth, buildWebhookRequest, async (req, res) => {
  const { command } = req.body;

  if (command === "download-video") {
    delete req.body.command;

    videoServerQueue.add(req.body);
    console.log(
      `✅ Job succesfully added to queue: ${process.env.MESSAGE_QUEUE}`
    );
    return res.sendStatus(200);
  }

  if (command === "invalid-command") {
    const { message } = req.body;

    await sendText(message);
    return res.sendStatus(200);
  }

  return res.sendStatus(404);
});

export default routes;

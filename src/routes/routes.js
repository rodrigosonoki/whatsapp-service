import { Router } from "express";
import sendText from "../services/sendText.js";
import sendVideo from "../services/sendVideo.js";
import auth from "../middleware/auth.js";
import queueConnection from "../infra/queueConnection.js";

const routes = Router();
const videoServerQueue = queueConnection("videoserver");

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

routes.post("/webhook", async (req, res) => {
  const message = req.body.text;
  try {
    videoServerQueue.add(message);
    console.log("Job added to queue!");
    //console.log(`message ${message} added to queue`);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

export default routes;

import dotenv from "dotenv";

dotenv.config();

const buildWebhookRequest = async (req, res, next) => {
  const { message } = req.body.text;
  const command = message.split(" ")[0];

  const request = {};

  if (command === "d") {
    request.videoUrl = message.split(" ")[1];
    request.command = "download-video";
  } else {
    request.message = "Desculpe, comando inválido 😔";
    request.command = "invalid-command";
  }

  req.body = request;
  next();
};

export default buildWebhookRequest;

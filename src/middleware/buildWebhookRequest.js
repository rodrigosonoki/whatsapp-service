import dotenv from "dotenv";

dotenv.config();

const buildWebhookRequest = async (req, res, next) => {
  const { message } = req.body.text;
  const request = {
    message,
  };

  req.body = request;
  next();
};

export default buildWebhookRequest;

import dotenv from "dotenv";

dotenv.config();

const webhookAuth = async (req, res, next) => {
  if (
    req.body.phone != process.env.PHONE ||
    req.body.instanceId != process.env.INSTANCE_ID
  ) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  next();
};

export default webhookAuth;

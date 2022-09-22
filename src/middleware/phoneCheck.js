import dotenv from "dotenv";

dotenv.config();

const phoneCheck = async (req, res, next) => {
  if (req.body.phone != process.env.PHONE) {
    return res.status(403).json({
      message: "Unauthorized.",
    });
  }
  next();
};

export default phoneCheck;

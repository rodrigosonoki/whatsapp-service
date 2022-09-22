import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  if (req.headers.authorization != process.env.TOKEN) {
    return res.status(403).json({
      message: "Invalid token.",
    });
  }
  next();
};

export default auth;

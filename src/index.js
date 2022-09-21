import express from "express";
import routes from "./routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/", routes);

app.listen(process.env.PORT, () => console.log("whatsapp-service is running!"));

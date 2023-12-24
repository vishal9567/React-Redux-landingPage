import express from "express";
import dotenv from "dotenv";
import userRouter from "./services/routes/userRouter.js";
import { mongoDbConnection } from "./config/mongoDbConnection.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
mongoDbConnection();
const options = {
  origin: "http://localhost:3000",
  method: "GET , HEAD, POST, PUT, PATCH, DELETE",
  Credentials: true,
};

app.use(cors(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`sever start at: http://localhost:${PORT}`);
});

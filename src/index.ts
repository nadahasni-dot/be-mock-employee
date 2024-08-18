import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response } from "express";
import {
  authRouter,
  biodataRouter,
  educationRouter,
  jobRouter,
  trainingRouter,
} from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const apiUrl = "/api/v1";

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(`${apiUrl}/auth`, authRouter);
app.use(`${apiUrl}/biodata`, biodataRouter);
app.use(`${apiUrl}/education`, educationRouter);
app.use(`${apiUrl}/job`, jobRouter);
app.use(`${apiUrl}/training`, trainingRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.use(function (_, res) {
  res.status(404);
  res.json({ message: "not found" });
  return;
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

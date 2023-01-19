import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "config_var.env" });

const app: Express = express();
app.use(cors());

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

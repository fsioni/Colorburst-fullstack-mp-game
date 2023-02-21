import { Router } from "express";
const gameRouteur = Router();

gameRouteur.get("/rooms", (req: any, res: any) => {
  res.json({
    test: "ok ok",
  });
});

console.log("ok ok");

export default gameRouteur;

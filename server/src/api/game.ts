import express, { Router } from "express";
import { roomValidationRules, validate } from "./expressValidator";
import { gameManager } from "../index";
import { CreateGameSettings } from "../game/interfaces";

const gameRouteur = Router();

// get the rooms list and post methode to create a new room
gameRouteur
  .get("/", (req: express.Request, res: express.Response) => {
    res.json(gameManager.gamesList);
  })
  .post(
    "/",
    roomValidationRules(),
    validate,
    (req: express.Request, res: express.Response) => {
      const settings: CreateGameSettings = {
        roomId: Math.random().toString(36).substring(7),
        roomName: req.body.roomName,
        boardSize: req.body.boardSize,
        nbPlayersMax: req.body.nbPlayersMax,
        isPrivate: req.body.isPrivate,
      };
      gameManager.createGame(settings);
      const password = gameManager.getGame(settings.roomId)?.password;
      res.json({ roomId: settings.roomId, roomPass: password });
    }
  );

export default gameRouteur;

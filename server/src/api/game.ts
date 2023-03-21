import express, { Router } from "express";
//import { ResultWithContext } from "express-validator/src/chain";
import { body, check, validationResult } from "express-validator";
const gameRouteur = Router();

interface Room {
  roomId: number;
  roomName: string;
  nbPlayers: number;
  playersMax: number;
  isPrivate: boolean;
  password?: number;
}

const Rooms: Room[] = [];

// get the rooms list and post methode to create a new room
gameRouteur
  .get("/", (req: express.Request, res: express.Response) => {
    res.json(Rooms);
  })
  .post(
    "/",
    [
      check(
        "roomName",
        "Room name must be between 3 and 10 caracters"
      ).isLength({ min: 3, max: 10 }),
      check(
        "playersMax",
        "The players in your room must be between 10 and 100"
      ).isInt({ min: 10, max: 100 }),
      check("isPrivate", "The private option must be a boolean").isBoolean(),
    ],
    (req: express.Request, res: express.Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
      }
      const room = {
        roomId: req.body.roomId,
        roomName: req.body.roomName,
        nbPlayers: req.body.nbPlayers,
        playersMax: req.body.playersMax,
        isPrivate: req.body.isPrivate,
        password: req.body.password,
      };
      Rooms.push(room);
      return res.status(200);
    }
  );

export default gameRouteur;

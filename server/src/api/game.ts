import express, { Router } from "express";
import { ResultWithContext } from "express-validator/src/chain";
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

// get the rooms list
gameRouteur.get("/", (req: express.Request, res: express.Response) => {
  res.json(Rooms);
});

gameRouteur.param("/", (req, res, next) => {
  console.log("okokkok");
  next();
});

// post methode to create a new room
gameRouteur.post("/", (req: express.Request, res: express.Response) => {
  res.send("Room create Post request");
  const room = {
    roomId: req.body.roomId,
    roomName: req.body.roomName,
    nbPlayers: req.body.nbPlayers,
    playersMax: req.body.playersMax,
    isPrivate: req.body.isPrivate,
    password: req.body.password,
  };
  console.log(room);
  Rooms.push(room);
});

gameRouteur
  .route("/:id")
  .get((req: any, res: any) => {
    res.send(`Get room with id ${req.params.id} \n`); // get a single room
  })
  .put((req: any, res: any) => {
    res.send(`Update room with id ${req.params.id} \n`); // update a single room
  })
  .delete((req: any, res: any) => {
    res.send(`Delete room with id ${req.params.id} \n`); // delete a single room
  });

export default gameRouteur;

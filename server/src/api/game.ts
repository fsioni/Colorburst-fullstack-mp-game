import { Router } from "express";
const gameRouteur = Router();

interface Room {
  roomId: number;
  roomName: string;
  nbPlayers: number;
  playersMax: number;
  isPrivate: boolean;
  password?: number;
}

// get the rooms list
gameRouteur.get("/", (req: any, res: any) => {
  res.json([
    {
      roomId: 1,
      roomName: "Barthelimi",
      nbPlayers: 10,
      playersMax: 20,
      isPrivate: true,
      password: 69,
    },
    {
      roomId: 2,
      roomName: "alloooooooo",
      nbPlayers: 1,
      playersMax: 15,
      isPrivate: false,
    },
    {
      roomId: 3,
      roomName: "La J",
      nbPlayers: 1,
      playersMax: 5,
      isPrivate: false,
      password: null,
    },
    {
      roomId: 5,
      roomName: "C'est troop le S",
      nbPlayers: 100,
      playersMax: 200,
      isPrivate: false,
      password: null,
    },
    {
      roomId: 1,
      roomName: "Lagavame",
      nbPlayers: 50,
      playersMax: 50,
      isPrivate: true,
      password: 69200,
    },
  ]);
});

gameRouteur.param("/", (req, res, next, jsonFile) => {
  const listOfRooms = jsonFile;
  console.log("okokkok");
  next();
});

// create a new room
gameRouteur.post("/", (req: any, res: any) => {
  res.send("Create a new room");
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

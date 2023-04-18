import express from "express";
import { body, validationResult } from "express-validator";

export const roomValidationRules = () => {
  return [
    // Room Name must be string between 3 and 10 caracters
    body("roomName").exists().isString().isLength({ min: 2, max: 10 }),
    body("nbPlayersMax").exists().isInt({ min: 2, max: 100 }),
    body("boardSize").exists().exists().isInt({ min: 10, max: 100 }),
    body("isPrivate").exists().isBoolean(),
  ];
};

export const validate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
    console.log("Ca passe");
  } else {
    return res.status(422).json({ errors: errors.array() });
    console.log("ERROR !");
  }
};

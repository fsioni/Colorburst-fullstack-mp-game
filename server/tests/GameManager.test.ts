import { describe, expect, test } from "@jest/globals";
import { Server } from "socket.io";
import GameManager from "../src/GameManager";

describe("GameManager", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test("createGame", () => {
    const io = new Server();
    const gameManager = new GameManager(io);
    const game = gameManager.createGame({
      boardSize: 80,
      nbPlayersMax: 4,
      isPrivate: false,
      invitationCode: "1234",
    });
    expect(game).toBeDefined();
    expect(gameManager.gamesList.length).toBe(1);
    expect(gameManager.getGame(game.gameID)).toBe(game);

    expect(gameManager.getGame(game.gameID)?.boardSize).toBe(80);
    expect(gameManager.getGame(game.gameID)?.nbPlayersMax).toBe(4);
    expect(gameManager.getGame(game.gameID)?.isPrivate).toBe(false);
    expect(gameManager.getGame(game.gameID)?.invitationCode).toBe("1234");
  });

  test("getGame", () => {
    const io = new Server();
    const gameManager = new GameManager(io);
    const game = gameManager.createGame({
      boardSize: 80,
      nbPlayersMax: 4,
      isPrivate: false,
      invitationCode: "1234",
    });
    expect(gameManager.getGame(game.gameID)).toBe(game);
  });

  test("deleteGame", () => {
    const io = new Server();
    const gameManager = new GameManager(io);
    const game = gameManager.createGame({
      boardSize: 80,
      nbPlayersMax: 4,
      isPrivate: false,
      invitationCode: "1234",
    });
    expect(gameManager.gamesList.length).toBe(1);
    gameManager.deleteGame(game.gameID);
    expect(gameManager.gamesList.length).toBe(0);
  });
});

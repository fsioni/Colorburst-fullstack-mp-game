import { describe, expect, test } from "@jest/globals";
import Board from "../src/game/board";

describe("board", () => {
  test("createBoard", () => {
    const boardSize = 80;
    const board = new Board(boardSize);
    expect(board.boardSize).toBe(boardSize);
    expect(board.boardCells.length).toBe(boardSize);
    expect(board.boardCells[0].length).toBe(boardSize);
  });

  test("clearBoard", () => {
    const boardSize = 80;
    const board = new Board(boardSize);
    board.occupeCellsSpawn({ x: 10, y: 10 }, "player1");
    board.clearBoard();
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        expect(board.boardCells[i][j].territoryOccupiedBy).toBe(null);
      }
    }
  });

  test("occupeCellsSpawn", () => {
    const boardSize = 80;
    const board = new Board(boardSize);
    board.occupeCellsSpawn({ x: 10, y: 10 }, "player1");
    for (let i = 8; i <= 12; i++) {
      for (let j = 8; j <= 12; j++) {
        expect(board.boardCells[i][j].territoryOccupiedBy).toBe("player1");
      }
    }
  });

  test("getCell", () => {
    const boardSize = 80;
    const board = new Board(boardSize);
    const cell = board.getCell({ x: 10, y: 10 });
    expect(cell).toBeDefined();
    expect(cell?.x).toBe(10);
    expect(cell?.y).toBe(10);
  });

  test("setTrail", () => {
    // we need to find out how to mock the player/change the function
  });

  test("isInBoard", () => {
    // we need to find out how to mock the player/change the function
  });

  test("getTerritoriesCount", () => {
    // we need to find out how to mock the player/change the function
  });
});

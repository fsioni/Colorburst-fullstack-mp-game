import PlayerGameStats from "../src/game/playerGameStats";
import { Stats } from "../src/enums/Stats";

describe("PlayerGameStats", () => {
  let playerGameStats: PlayerGameStats;

  beforeEach(() => {
    playerGameStats = new PlayerGameStats();
  });

  test("should create a new instance with all properties set to 0", () => {
    expect(playerGameStats._kills).toBe(0);
    expect(playerGameStats._killed).toBe(0);
    expect(playerGameStats._blocksCaptured).toBe(0);
    expect(playerGameStats._blocksTravelled).toBe(0);
  });

  test("should update the kills property when adding kills", () => {
    playerGameStats.Add(Stats.KILL, 5);
    expect(playerGameStats._kills).toBe(5);
  });

  test("should update the killed property when adding deaths", () => {
    playerGameStats.Add(Stats.KILLED, 3);
    expect(playerGameStats._killed).toBe(3);
  });

  test("should update the blocksCaptured property when adding captured blocks", () => {
    playerGameStats.Add(Stats.BLOCK_CAPTURED, 10);
    expect(playerGameStats._blocksCaptured).toBe(10);
  });

  test("should update the blocksTravelled property when adding travelled blocks", () => {
    playerGameStats.Add(Stats.BLOCK_TRAVELLED, 100);
    expect(playerGameStats._blocksTravelled).toBe(100);
  });

  test("should update all properties when adding multiple stats", () => {
    playerGameStats.Add(Stats.KILL, 1);
    playerGameStats.Add(Stats.KILLED, 2);
    playerGameStats.Add(Stats.BLOCK_CAPTURED, 3);
    playerGameStats.Add(Stats.BLOCK_TRAVELLED, 4);

    expect(playerGameStats._kills).toBe(1);
    expect(playerGameStats._killed).toBe(2);
    expect(playerGameStats._blocksCaptured).toBe(3);
    expect(playerGameStats._blocksTravelled).toBe(4);
  });
});

export default class Cell {
  territoryOccupiedBy: string | null;
  trailsBy: string | null;
  x = 0;
  y = 0;

  constructor(x: number, y: number) {
    this.territoryOccupiedBy = null;
    this.trailsBy = null;
    this.x = x;
    this.y = y;
  }
}

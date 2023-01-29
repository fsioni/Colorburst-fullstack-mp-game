export default class Cell {
  territoryOccupiedBy: string | null;
  trailsBy: string | null;

  constructor() {
    this.territoryOccupiedBy = null;
    this.trailsBy = null;
  }
}

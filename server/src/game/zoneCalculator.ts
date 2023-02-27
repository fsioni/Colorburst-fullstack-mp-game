import Cell from "./cell";

export default class ZoneCalculator {
  cells: Cell[][];
  playerId: string;
  cellsToVisit: Cell[] = [];
  cellsVisited: Cell[] = [];
  maxX = 0;
  maxY = 0;
  minX = 0;
  minY = 0;
  constructor(cells: Cell[][], playerId: string) {
    this.cells = cells;
    this.playerId = playerId;
    this.cellsToVisit = this.getCellsToVisit();
  }

  fillZone() {
    while (this.cellsToVisit.length > 0) {
      const cell = this.cellsToVisit.pop();
      if (!cell) return;
      this.visitNeighbours(cell);
    }

    // On remplace les traces par des territoires
    this.cells.flat().forEach((cell) => {
      if (cell.trailsBy === this.playerId) {
        cell.territoryOccupiedBy = this.playerId;
        cell.trailsBy = null;
      }
    });
  }

  private visitNeighbours(cell: Cell) {
    const neighbours = this.getNeighbours(cell);
    const zone = [cell];
    let zoneValid = this.determineIfCellValid(cell);
    this.cellsVisited.push(cell);

    while (neighbours.length > 0) {
      // On retire de toVisit les cellules déjà visitées
      this.cellsToVisit = this.cellsToVisit.filter(
        (cell) => !this.cellsVisited.includes(cell)
      );
      const neighbour = neighbours.pop();
      if (!neighbour) continue;
      zone.push(neighbour);
      this.cellsVisited.push(neighbour);
      if (zoneValid) {
        // On vérifie si la cellule rend invalide la zone
        zoneValid = this.determineIfCellValid(neighbour);
      }

      const neighboursNeighbours = this.getNeighbours(neighbour);
      neighbours.push(...neighboursNeighbours);
    }

    if (zoneValid) {
      // On dessine la zone !
      zone.forEach((cell) => {
        cell.territoryOccupiedBy = this.playerId;
      });
    }
  }

  private determineIfCellValid(cell: Cell): boolean {
    // On vérifie si la cellule est valide c'est a dire si elle ne touche pas un bord de la zone de recherche
    if (
      cell.x == this.minX ||
      cell.x == this.maxX ||
      cell.y == this.minY ||
      cell.y == this.maxY
    )
      return false;
    return true;
  }

  private getCell(x: number, y: number): Cell | null {
    const cell = this.cells[x]?.[y];
    if (!cell) return null;
    return this.cells[x][y];
  }

  private getCellsToVisit(): Cell[] {
    const playerId = this.playerId;
    const playerTrail = this.cells
      .flat()
      .filter((cell) => cell.trailsBy === playerId);
    const playerTerritory = this.cells
      .flat()
      .filter((cell) => cell.territoryOccupiedBy === playerId);

    const playerZoneLimit = playerTrail.concat(playerTerritory);

    // On récupère les coordonnées max et min des cellules du joueur pour créer une zone autour
    this.maxX = Math.max(...playerZoneLimit.map((cell) => cell.x));
    this.minX = Math.min(...playerZoneLimit.map((cell) => cell.x));
    this.maxY = Math.max(...playerZoneLimit.map((cell) => cell.y));
    this.minY = Math.min(...playerZoneLimit.map((cell) => cell.y));

    // On récupère les cellules à visiter
    const toVisit = this.cells
      .flat()
      .filter(
        (cell) =>
          cell.x >= this.minX &&
          cell.x <= this.maxX &&
          cell.y >= this.minY &&
          cell.y <= this.maxY &&
          cell.territoryOccupiedBy !== playerId &&
          cell.trailsBy !== playerId
      );
    return toVisit;
  }

  private getNeighbours(cell: Cell): Cell[] {
    const neighbours = [];
    const { x, y } = cell;
    const left = this.getCell(x - 1, y);
    const right = this.getCell(x + 1, y);
    const top = this.getCell(x, y - 1);
    const bottom = this.getCell(x, y + 1);
    if (
      left &&
      !this.cellsVisited.includes(left) &&
      this.cellsToVisit.includes(left)
    )
      neighbours.push(left);
    if (
      right &&
      !this.cellsVisited.includes(right) &&
      this.cellsToVisit.includes(right)
    )
      neighbours.push(right);
    if (
      top &&
      !this.cellsVisited.includes(top) &&
      this.cellsToVisit.includes(top)
    )
      neighbours.push(top);
    if (
      bottom &&
      !this.cellsVisited.includes(bottom) &&
      this.cellsToVisit.includes(bottom)
    )
      neighbours.push(bottom);
    return neighbours;
  }
}

type HEX = `#${string}`;

interface FillColorsInterface {
  background: HEX;
  emptyCell: HEX;
  cell: HEX;
  cellBorder: HEX;
  player: HEX;
}

const fillColors: FillColorsInterface = {
  background: "#000000",
  emptyCell: "#FFFFFF",
  cell: "#d62f2f",
  cellBorder: "#000000",
  player: "#FF0000",
};

export default fillColors;

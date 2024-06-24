function Gameboard(size) {
  let boardMatrix = createBoard();
  let shiplist = [];
  let totalHit = 0;

  function createBoard() {
    let board = Array.from(Array(size), () => []);
    board.forEach((element, i) => {
      for (let j = 0; j < size; j++) {
        element.push(createGrid(i, j));
      }
    });

    return board;
  }

  function createGrid(x, y) {
    let ship = null;
    let isHit = false;

    return { x, y, ship, isHit };
  }

  function placeShip(ship, [x, y]) {
    let locations = [];

    for (let n = 0; n < ship.getLength(); n++) {
      if (ship.isVertical()) {
        if (y + n >= size) throw new Error("Out of Bound");
        if (boardMatrix[x][y + n].ship !== null)
          throw new Error("Grid already occupied");
        locations.push([x, y + n]);
      } else {
        if (x + n >= size) throw new Error("Out of Bound");
        if (boardMatrix[x + n][y].ship !== null)
          throw new Error("Grid already occupied");
        locations.push([x + n, y]);
      }
    }

    locations.forEach((l) => (boardMatrix[l[0]][l[1]].ship = ship));
    shiplist.push(ship);
  }

  function isAllSunk() {
    if (shiplist.length === 0) return true;

    let result = true;
    shiplist.forEach((ship) => {
      if (!ship.isSunk()) result = false;
    });
    return result;
  }

  function receiveAttack([x, y]) {
    let target = boardMatrix[x][y];
    if (target.isHit) throw new Error("Grid already hit");
    target.isHit = true;
    totalHit++;
    if (target.ship !== null) {
      target.ship.hit();
      return true;
    }
    return false;
  }

  function getGrid([x, y]) {
    return boardMatrix[x][y];
  }

  function getTotalHit() {
    return totalHit;
  }

  function getSize() {
    return size;
  }

  return {
    getSize,
    getGrid,
    placeShip,
    receiveAttack,
    isAllSunk,
    getTotalHit
  };
}

export default Gameboard;

function Gameboard() {
  let boardMatrix = Array.from(Array(16), () => []);
  boardMatrix.forEach((element, i) => {
    for (let j = 0; j < 16; j++) {
      element.push(createGrid(i, j));
    }
  });

  function createGrid(x, y) {
    let ship = null;
    let isHit = false;

    return { x, y, ship, isHit };
  }

  function placeShip(ship, [x, y]) {
    let n = 0;

    if (ship.isVertical()) {
      if (ship.length + x > 16) throw new Error("Out of bound placement");
      while (n < ship.length) {
        let ypos = y + n;
        boardMatrix[x][ypos].ship = ship;
        n++;
      }
    } else {
      if (ship.length + y > 16) throw new Error("Out of bound placement");
      while (n < ship.length) {
        let xpos = x + n;
        boardMatrix[xpos][y].ship = ship;
        n++;
      }
    }
  }

  function receiveAttack([x, y]) {
    let grid = boardMatrix[x][y];
    return !(grid.ship === null);
  }

  return {
    placeShip,
    receiveAttack,
  };
}

export default Gameboard;

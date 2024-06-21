function Gameboard(size) {
  let boardMatrix = Array.from(Array(size), () => []);
  boardMatrix.forEach((element, i) => {
    for (let j = 0; j < size; j++) {
      element.push(createGrid(i, j));
    }
  });

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
  }

  function receiveAttack([x, y]) {
    let target = boardMatrix[x][y];
    if (target.isHit) throw new Error("Grid already hit");
    if (target.ship !== null) target.ship.hit();
    target.isHit = true;
  }

  return {
    placeShip,
    receiveAttack,
  };
}

export default Gameboard;

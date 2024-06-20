function Gameboard() {

  let boardMatrix = new Array(16).fill([]);
  boardMatrix.forEach((element,i) => {
    for (let j = 0; j < 16; j++) {
        element.push(createGrid(i,j));
    }
  });

  function createGrid(x,y) {
    let ship = null;
    let isHit = false;

    return {x, y, ship, isHit};
  }

  function placeShip(ship, [x, y]) {}

  function receiveAttack([x, y]) {
    let grid = boardMatrix[x][y];
    if (grid.ship === null) return false;

    return null;
  }

  return {
    placeShip,
    receiveAttack,
  };
}

export default Gameboard;

import Gameboard from "../gameboard.js";
import Ship from "../ship.js";

describe("out of bound errors", () => {
  const gameboard = Gameboard(2);

  test("out of bound placing ship: 1", () => {
    const ship = Ship(1);
    expect(() => gameboard.placeShip(ship, [2, 1])).toThrow();
  });

  test("out of bound placing ship: 2", () => {
    const ship = Ship(2);
    expect(() => gameboard.placeShip(ship, [1, 1])).toThrow();
  });

  test("out of bound placing ship: 2", () => {
    const ship = Ship(2, true);
    expect(() => gameboard.placeShip(ship, [1, 1])).toThrow();
  });
});

describe("occupied error", () => {
  const gameboard = Gameboard(2);
  const ship_1 = Ship(1);
  const ship_2 = Ship(2);
  gameboard.placeShip(ship_1, [1, 1]);

  test("occupied board error: 1", () => {
    expect(() => gameboard.placeShip(ship_2, [1, 1])).toThrow();
  });

  test("occupied board error: 2", () => {
    expect(() => gameboard.placeShip(ship_2, [0, 1])).toThrow();
  });

  test("occupied board error: 3", () => {
    expect(() => gameboard.placeShip(ship_2, [1, 0])).toThrow();
  });
});

describe("length 1 ship receiving hit", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(1);
  gameboard.placeShip(ship, [1, 1]);

  test("not receiving any", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("recieved but missed", () => {
    gameboard.receiveAttack([1, 0]);
    expect(ship.isSunk()).toBe(false);
  });

  test("recieved and hit", () => {
    gameboard.receiveAttack([1, 1]);
    expect(ship.isSunk()).toBe(true);
  });
});

describe("length 2 ship receiving hit", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2, true);
  gameboard.placeShip(ship, [0, 0]);

  test("first: hit", () => {
    gameboard.receiveAttack([0, 0]);
    expect(ship.isSunk()).toBe(false);
  });

  test("second: missed", () => {
    gameboard.receiveAttack([1, 0]);
    expect(ship.isSunk()).toBe(false);
  });

  test("third: missed", () => {
    gameboard.receiveAttack([1, 1]);
    expect(ship.isSunk()).toBe(false);
  });

  test("fourth: hit", () => {
    gameboard.receiveAttack([0, 1]);
    expect(ship.isSunk()).toBe(true);
  });
});

describe("targetting already hit grid error", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(1);
  gameboard.placeShip(ship, [1, 1]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([1, 1]);

  test("error without ship", () => {
    expect(() => gameboard.receiveAttack([0, 0])).toThrow();
  });

  test("error with ship", () => {
    expect(() => gameboard.receiveAttack([1, 1])).toThrow();
  });
});

describe("All sunk test", () => {
  const gameboard = Gameboard(2);
  const ship_1 = Ship(1);
  const ship_2 = Ship(1);

  test("none placed", () => {
    expect(gameboard.isAllSunk()).toBe(true);
  });

  test("place but none hit", () => {
    gameboard.placeShip(ship_1, [0, 0]);
    gameboard.placeShip(ship_2, [1, 1]);
    expect(gameboard.isAllSunk()).toBe(false);
  });

  test("only one sunk", () => {
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.isAllSunk()).toBe(false);
  });

  test("all sunk", () => {
    gameboard.receiveAttack([1, 1]);
    expect(gameboard.isAllSunk()).toBe(true);
  });

  test("add new ship, not sunk", () => {
    const ship_3 = Ship(1);
    gameboard.placeShip(ship_3, [1, 0]);
    expect(gameboard.isAllSunk()).toBe(false);
  })
});

import Gameboard from "../gameboard.js";
import Ship from "../ship.js";

test("out of bound placing ship: 1", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(1)
  expect(() => gameboard.placeShip(ship, [2,1])).toThrow();
})

test("out of bound placing ship: 2", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2)
  expect(() => gameboard.placeShip(ship, [1,1])).toThrow();
})

test("out of bound placing ship: 2", () => {
  const gameboard = Gameboard(2);
  const ship = Ship(2, true)
  expect(() => gameboard.placeShip(ship, [1,1])).toThrow();
})

test("occupied board error: 1", () => {
  const gameboard = Gameboard(2);
  const ship_1 = Ship(1);
  const ship_2 = Ship(1);
  gameboard.placeShip(ship_1, [1,1]);
  expect(() => gameboard.placeShip(ship_2, [1,1])).toThrow();
})

test("occupied board error: 2", () => {
  const gameboard = Gameboard(2);
  const ship_1 = Ship(1);
  const ship_2 = Ship(2);
  gameboard.placeShip(ship_1, [1,1]);
  expect(() => gameboard.placeShip(ship_2, [0,1])).toThrow();
})

test("occupied board error: 3", () => {
  const gameboard = Gameboard(2);
  const ship_1 = Ship(1);
  const ship_2 = Ship(2);
  gameboard.placeShip(ship_1, [1,1]);
  expect(() => gameboard.placeShip(ship_2, [1,0])).toThrow();
})



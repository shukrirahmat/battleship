import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const gameboard = Gameboard();

describe("empty board test", () => {
  test("empty board 1", () => {
    expect(gameboard.receiveAttack([2, 3])).toBe(false);
  });

  test("empty board 2", () => {
    expect(gameboard.receiveAttack([10, 8])).toBe(false);
  });

  test("empty board 3", () => {
    expect(gameboard.receiveAttack([5, 4])).toBe(false);
  });
});

describe("placing ship test", () => {
  beforeAll(() => {
    let ship_1 = Ship(1);
    gameboard.placeShip(ship_1, [2, 3]);

    let ship_2 = Ship(2);
    gameboard.placeShip(ship_2, [10,8]);

    let ship_3 = Ship(2, true);
    gameboard.placeShip(ship_3, [5,4]);

  });

  test("ship length 1:1", () => {
    expect(gameboard.receiveAttack([2, 3])).toBe(true);
  });

  test("ship length 1 right", () => {
    expect(gameboard.receiveAttack([3, 3])).toBe(false);
  });

  test("ship length 1 bottom", () => {
    expect(gameboard.receiveAttack([2, 4])).toBe(false);
  });

  test("ship length 2", () => {
    expect(gameboard.receiveAttack([10, 8])).toBe(true);
  });

  test("ship length 2 right", () => {
    expect(gameboard.receiveAttack([11, 8])).toBe(true);
  });

  test("ship length 2 bottom", () => {
    expect(gameboard.receiveAttack([10, 9])).toBe(false);
  });

  test("ship length 2 vertical", () => {
    expect(gameboard.receiveAttack([5, 4])).toBe(true);
  });

  test("ship length 2 vertical right", () => {
    expect(gameboard.receiveAttack([6, 4])).toBe(false);
  });

  test("ship length 2  vertical bottom", () => {
    expect(gameboard.receiveAttack([5, 5])).toBe(true);
  });

  test("error out of bound placement : 1", () => {
    expect(() => gameboard.placeShip(Ship(1), [16,4])).toThrow();
  })

  test("error out of bound placement : 2", () => {
    expect(() => gameboard.placeShip(Ship(3), [14,4])).toThrow();
  })

  test("error out of bound placement : 3", () => {
    expect(() => gameboard.placeShip(Ship(2, true), [10,15])).toThrow();
  })
  
});

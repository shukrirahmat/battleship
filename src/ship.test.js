import Ship from "./ship.js";

const ship = Ship(3);

describe("ship test", () => {
  test("initially not sunk", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("not sunk after one hits", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("Sunk after 3 hits", () => {
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});

import Gameboard from "./gameboard.js";

const gameboard = Gameboard();

describe("gameboard test", () => {
  test("empty board 1", () => {
    expect(gameboard.receiveAttack([2,3])).toBe(false);
  });

  test("empty board 2", () => {
    expect(gameboard.receiveAttack([10,8])).toBe(false);
  });

  test("empty board 3", () => {
    expect(gameboard.receiveAttack([12,5])).toBe(false);
  });
});

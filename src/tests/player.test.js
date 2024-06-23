import { HumanPlayer, Player } from "../player.js";
import Ship from "../ship.js";

describe("human player attack", () => {
  const human = HumanPlayer(2);
  const enemy = Player(2);
  enemy.getBoard().placeShip(Ship(1), [1, 1]);

  test("before attack", () => {
    expect(enemy.getBoard().isAllSunk()).toBe(false);
  })

  test("after attack", () => {
    human.executeAttack([1,1], enemy);
    expect(enemy.getBoard().isAllSunk()).toBe(true);
  });
});

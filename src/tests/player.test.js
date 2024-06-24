import { Player, HumanPlayer, ComputerPlayer} from "../player.js";
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

describe("computer player attack", () => {
  const computer = ComputerPlayer(2);
  const enemy = Player(2);

  test("attack once", () => {
    computer.executeAttack(enemy);
    expect(enemy.getBoard().getTotalHit()).toBe(1);
  })

  test("attack twice", () => {
    computer.executeAttack(enemy);
    expect(enemy.getBoard().getTotalHit()).toBe(2);
  })

  test("attack thrice", () => {
    computer.executeAttack(enemy);
    expect(enemy.getBoard().getTotalHit()).toBe(3);
  })

})

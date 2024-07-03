import { ComputerPlayer } from "../player.js";

describe("computer choose", () => {
  let computer = ComputerPlayer(2);
  let hitList = [];

  test("choose once", () => {
    hitList.push(computer.choose());
    expect(hitList.length).toBe(1);
  });

  test("choose twice", () => {
    hitList.push(computer.choose());
    expect(hitList.length).toBe(2);
  });

  test("chose 4 times", () => {
    hitList.push(computer.choose());
    hitList.push(computer.choose());
    expect(hitList.length).toBe(4);
  });

  test("last is null", () => {
    expect(() => computer.choose()).toThrow();
  });

  test("others is truthy", () => {
    expect(hitList.at(0)).toBeTruthy();
    expect(hitList.at(1)).toBeTruthy();
    expect(hitList.at(2)).toBeTruthy();
    expect(hitList.at(3)).toBeTruthy();
  });
});

describe("choose depending on recent hit", () => {
  let computer;

  beforeEach(() => {
    computer = ComputerPlayer(4);
  });

  test("single recent", () => {
    computer.addRecentHit([1, 1]);
    const choice = computer.choose();
    const pos1 = choice[0] === 0 && choice[1] === 1;
    const pos2 = choice[0] === 2 && choice[1] === 1;
    const pos3 = choice[0] === 1 && choice[1] === 0;
    const pos4 = choice[0] === 1 && choice[1] === 2;
    expect(pos1 || pos2 || pos3 || pos4).toBe(true);
  });

  test("two recent", () => {
    computer.addRecentHit([1, 1]);
    computer.addRecentHit([1, 2]);
    const choice = computer.choose();
    const pos1 = choice[0] === 1 && choice[1] === 0;
    const pos2 = choice[0] === 1 && choice[1] === 3;
    expect(pos1 || pos2 ).toBe(true);
  });

  test("single but close to wall", () => {
    computer.addRecentHit([3, 0]);
    const choice = computer.choose();
    const pos1 = choice[0] === 3 && choice[1] === 1;
    const pos2 = choice[0] === 2 && choice[1] === 0;
    expect(pos1 || pos2).toBe(true);
  })

  test("two but close to wall", () => {
    computer.addRecentHit([2, 1]);
    computer.addRecentHit([3, 1]);
    const choice = computer.choose();
    const pos = choice[0] === 1 && choice[1] === 1;
    expect(pos).toBe(true);
  });
});

describe("test filtering possible target", () => {
  const computer = ComputerPlayer(3);

  test("should only choose from first column", () => {

    computer.filterSunkShipArea([[2,0], [2,1]]);
    const choice = computer.choose();
    const pos1 = choice[0] === 0 && choice[1] === 0;
    const pos2 = choice[0] === 0 && choice[1] === 1;
    const pos3 = choice[0] === 0 && choice[1] === 2;
    expect(pos1 || pos2 || pos3).toBe(true);
  })
})

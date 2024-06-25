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
    hitList.push(computer.choose());
    expect(hitList.at(-1)).toBeNull();
  });

  test("others is truthy", () => {
    expect(hitList.at(0)).toBeTruthy();
    expect(hitList.at(1)).toBeTruthy();
    expect(hitList.at(2)).toBeTruthy();
    expect(hitList.at(3)).toBeTruthy();
  })
});

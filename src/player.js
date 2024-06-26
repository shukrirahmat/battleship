import Gameboard from "./gameboard.js";

function Player(boardsize, name="Player") {
  const board = new Gameboard(boardsize);
  const getBoard = () => board;
  const getName = () => name;

  return {
    getName,
    getBoard,
  };
}

function computerController(computer) {
  let size = computer.getBoard().getSize();
  let possibleTarget = setUpPossibleTarget();

  function choose() {
    if (possibleTarget.length === 0) return null;

    const index = Math.floor(Math.random() * possibleTarget.length);
    const choice = possibleTarget[index];
    possibleTarget.splice(index, 1);
    return choice;
  }

  function setUpPossibleTarget() {
    let list = []

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        list.push([x,y]);
      }
    }
    return list;
  }

  return {
    choose
  };
}

function ComputerPlayer(boardsize, name="Computer") {
  const computer = Player(boardsize, name);

  return {
    ...computer,
    ...computerController(computer),
  };
}

export { Player, ComputerPlayer };

import Gameboard from "./gameboard.js";

function Player(boardsize, name = "Player") {
  let board = Gameboard(boardsize);
  const getBoard = () => board;
  const getName = () => name;
  const resetBoard = () => {
    board = Gameboard(boardsize);
  };

  return {
    getName,
    getBoard,
    resetBoard,
  };
}

function computerController(computer) {
  let size = computer.getBoard().getSize();
  let possibleTarget = setUpPossibleTarget();

  function choose(lastGridHit = null) {
    let choice = null;
    let index;

    if (possibleTarget.length === 0) return null;
    if (lastGridHit) {
      possibleTarget.forEach((target, i) => {
        if (target[0] === lastGridHit[0] || target[1] === lastGridHit[1]) {
          choice = target;
          index = i;
        }
      });
    }

    if (choice === null) {
      index = Math.floor(Math.random() * possibleTarget.length);
      choice = possibleTarget[index];
    }
    possibleTarget.splice(index, 1);
    return choice;
  }

  function setUpPossibleTarget() {
    let list = [];

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        list.push([x, y]);
      }
    }
    return list;
  }

  return {
    choose,
  };
}

function ComputerPlayer(boardsize, name = "Computer") {
  const computer = Player(boardsize, name);

  return {
    ...computer,
    ...computerController(computer),
  };
}

export { Player, ComputerPlayer };

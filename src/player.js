import Gameboard from "./gameboard";

function Player(boardsize) {
  const board = new Gameboard(boardsize);
  const getBoard = () => board;

  return {
    getBoard,
  };
}

function humanController(player) {
  function executeAttack([x, y], computer) {
    computer.getBoard().receiveAttack([x, y]);
    if (computer.getBoard().getGrid([x, y]).ship === null) {
      computer.executeAttack(player);
    }
  }

  return {
    executeAttack,
  };
}

function computerController(computer) {
  function executeAttack(player) {
    let x;
    let y;
    let isTargetHit;
    let grid;

    do {
      x = Math.floor(Math.random() * 8);
      y = Math.floor(Math.random() * 8);
      grid = player.getBoard().getGrid([x, y]);

      if (grid.isHit) {
        isTargetHit = true;
      } else {
        isTargetHit = player.getBoard().receiveAttack([x, y]);
      }
    } while (isTargetHit);
  }

  return {
    executeAttack,
  };
}

function HumanPlayer(boardsize) {
  const player = Player(boardsize);

  return {
    ...player,
    ...humanController(player),
  };
}

function ComputerPlayer(boardsize) {
  const computer = Player(boardsize);

  return {
    ...computer,
    ...computerController(computer),
  };
}

export { HumanPlayer, ComputerPlayer };

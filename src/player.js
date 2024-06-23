import Gameboard from "./gameboard";

function Player(boardsize) {
  const board = new Gameboard(boardsize);
  const getBoard = () => board;

  return {
    getBoard,
  };
}

function humanController(obj) {
  function executeAttack([x, y], opponent) {
    opponent.getBoard().receiveAttack([x, y]);
    if (opponent.getBoard().getGrid([x, y]).ship === null) {
    }
  }

  return {
    executeAttack,
  };
}

function HumanPlayer(boardsize) {
  const player = Player(boardsize);

  return {
    ...Player(boardsize),
    ...humanController(player),
  };
}

export { Player, HumanPlayer };

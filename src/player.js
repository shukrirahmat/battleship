import Gameboard from "./gameboard";

function Player(boardsize) {
  const board = new Gameboard(boardsize);
  const getBoard = () => board;

  return {
    getBoard,
  };
}

export default Player;

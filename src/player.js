import Gameboard from "./gameboard";

function Player() {
  const board = new Gameboard(8);
  const getBoard = () => board;

  return {
    getBoard,
  };
}

export default Player;

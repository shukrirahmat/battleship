import { Player, HumanPlayer } from "./player.js";
import Ship from "./ship.js";
import "./styles.css";

const SIZE = 8;
const main = document.querySelector(".main");

setUpNewGame();

function setUpNewGame() {
  const human = new HumanPlayer(SIZE);
  const computer = new Player(SIZE);
  populateShip(human, computer);

  const humanBoard = createBoard(human);
  const computerBoard = createBoard(computer);
  addAttackButtons(computerBoard, computer, human)

  main.appendChild(humanBoard);
  main.appendChild(computerBoard);
}

function populateShip(human, computer) {
  human.getBoard().placeShip(Ship(1), [1, 1]);
  human.getBoard().placeShip(Ship(2), [2, 4]);
  human.getBoard().placeShip(Ship(3, true), [6, 3]);

  computer.getBoard().placeShip(Ship(1), [1, 1]);
  computer.getBoard().placeShip(Ship(2), [2, 4]);
  computer.getBoard().placeShip(Ship(3, true), [6, 3]);
}

function createBoard(player) {
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("boardContainer");

  for (let i = 0; i < SIZE * SIZE; i++) {
    const grid = document.createElement("div");
    const x = i % 8;
    const y = Math.floor(i / 8);
    grid.classList.add("grid");

    if (player.getBoard().getGrid([x, y]).ship !== null) {
      grid.classList.add("occupied");
    }

    boardContainer.appendChild(grid);
  }
  return boardContainer;
}

function addAttackButtons(board, self, opponent) {
  const grids = board.querySelectorAll(".grid");
  grids.forEach((node, i) => {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const button = document.createElement("button");
    button.classList.add("gridButton");

    button.addEventListener("click", () => {
      opponent.executeAttack([x, y], self);
      node.removeChild(node.firstChild);
    });

    node.appendChild(button);
  });
}

//TASKS NEXT:
// 1) Hide the occupied tag to not allowed to see location
// 2) Do enemy attack;

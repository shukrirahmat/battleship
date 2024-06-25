import {Player, ComputerPlayer } from "./player.js";
import Ship from "./ship.js";

const main = document.querySelector(".main");

function Dom() {
  let boardsize;
  let humanBoardNode;
  let computerBoardNode;


  function setUpNewGame(size) {
    boardsize = size;
    const human = new Player(size);
    const computer = new ComputerPlayer(size);
    populateShip(human, computer);

    humanBoardNode = createBoardNode(human);
    computerBoardNode = createBoardNode(computer);
    addAttackButtons(computer, human);

    main.appendChild(humanBoardNode);
    main.appendChild(computerBoardNode);
  }

  function populateShip(human, computer) {
    human.getBoard().placeShip(Ship(1), [1, 1]);
    human.getBoard().placeShip(Ship(2), [2, 4]);
    human.getBoard().placeShip(Ship(3, true), [6, 3]);

    computer.getBoard().placeShip(Ship(1), [2, 1]);
    computer.getBoard().placeShip(Ship(2), [3, 4]);
    computer.getBoard().placeShip(Ship(3, true), [7, 3]);
  }

  function createBoardNode(player) {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("boardContainer");

    for (let i = 0; i < boardsize * boardsize; i++) {
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

  function addAttackButtons(computer, human) {
    const grids = computerBoardNode.querySelectorAll(".grid");
    grids.forEach((grid, i) => {
      const x = i % 8;
      const y = Math.floor(i / 8);
      const button = document.createElement("button");
      button.classList.add("gridButton");
      grid.classList.remove("occupied");

      button.addEventListener("click", () => {
        const shipHit = computer.getBoard().receiveAttack([x, y]);
        markHit(grid);

        if (shipHit) grid.classList.add("occupied");

        if (!shipHit) {
          let enemyHit;
          let target;

          do {
            target = computer.choose();
            enemyHit = human.getBoard().receiveAttack(target);
            const targetNode = findNode(humanBoardNode, target);
            markHit(targetNode);
            
          } while (enemyHit);
        }
      });

      grid.appendChild(button);
    });
  }

  function markHit(node) {
    if (node.firstChild) node.removeChild(node.firstChild);
    node.textContent = "X";
  }

  function findNode(boardNode, target) {
    const grids = boardNode.querySelectorAll(".grid");

    const nth = target[1]*boardsize + target[0];
    return grids.item(nth);
  }

  return {
    setUpNewGame,
  };
}

const dom = Dom();

export default dom;

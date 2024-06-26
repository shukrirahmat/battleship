import { Player, ComputerPlayer } from "./player.js";
import Ship from "./ship.js";

function Dom() {
  const main = document.querySelector(".main");
  const info = document.querySelector(".info");
  let boardsize;

  function setUpNewGame(size) {
    boardsize = size;
    const human = new Player(size);
    const computer = new ComputerPlayer(size);
    populateShip(human, computer);

    const humanBoardNode = createBoardNode(human);
    const computerBoardNode = createBoardNode(computer);
    addAttackButtons(computer, computerBoardNode, human, humanBoardNode);

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

  function addAttackButtons(receiver, receiverNode, attacker, attackerNode) {
    const grids = receiverNode.querySelectorAll(".grid");
    grids.forEach((grid, i) => {
      const x = i % 8;
      const y = Math.floor(i / 8);
      const button = document.createElement("button");
      button.classList.add("gridButton");
      grid.classList.remove("occupied");

      button.addEventListener("click", () => {
        attackEvent(
          [x, y],
          grid,
          receiver,
          receiverNode,
          attacker,
          attackerNode
        );
      });

      grid.appendChild(button);
    });
  }

  function attackEvent(
    target,
    gridNode,
    receiver,
    receiverNode,
    attacker,
    attackerNode
  ) {
    const shipHit = receiver.getBoard().receiveAttack(target);
    gridNode.removeChild(gridNode.firstChild);
    markHit(gridNode);
    if (shipHit) {
      gridNode.classList.add("occupied");
      if (checkLose(receiver)) {
        disableButtonToggle(receiverNode, false);
        info.textContent = attacker.getName() + " wins!";
      }
    } else {
      disableButtonToggle(receiverNode, false);
      let isAttackerHit;
      let coordinate;

      const counterAttack = setInterval(function () {
        coordinate = receiver.choose();
        isAttackerHit = attacker.getBoard().receiveAttack(coordinate);
        const targetNode = findNode(attackerNode, coordinate);
        markHit(targetNode);

        if (!isAttackerHit) {
          disableButtonToggle(receiverNode, true);
          clearInterval(counterAttack);
        }

        if (checkLose(attacker)) {
          info.textContent = receiver.getName() + " wins!";
          clearInterval(counterAttack);
        }
      }, 1000);
    }
  }

  function checkLose(player) {
    return player.getBoard().isAllSunk();
  }

  function disableButtonToggle(boardNode, mode) {
    const buttons = boardNode.querySelectorAll("button");
    buttons.forEach((button) => {
      if (mode) button.removeAttribute("disabled");
      else button.setAttribute("disabled", "");
    });
  }

  function markHit(node) {
    clearRecent();
    node.textContent = "X";
    node.classList.add("recent");
  }

  function clearRecent() {
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid) => {
      grid.classList.remove("recent");
    });
  }

  function findNode(boardNode, target) {
    const grids = boardNode.querySelectorAll(".grid");

    const nth = target[1] * boardsize + target[0];
    return grids.item(nth);
  }

  return {
    setUpNewGame,
  };
}

const dom = Dom();

export default dom;

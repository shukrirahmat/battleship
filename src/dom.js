import { Player, ComputerPlayer } from "./player.js";
import Ship from "./ship.js";

function Dom() {
  const main = document.querySelector(".main");
  const info = document.querySelector(".info");
  let boardsize;

  function setUpNewGame(size, shipsData) {
    boardsize = size;
    const human = new Player(size);
    const computer = new ComputerPlayer(size);

    populateShipRandomly(human, createShipList(shipsData));
    populateShipRandomly(computer, createShipList(shipsData));

    const humanBoardNode = createBoardNode(human);
    const computerBoardNode = createBoardNode(computer);
    addAttackButtons(computer, computerBoardNode, human, humanBoardNode);

    main.appendChild(humanBoardNode);
    main.appendChild(computerBoardNode);
  }

  function createShipList(shipsData) {
    const list = [];
    shipsData.forEach((data) => {
      if (data[1]) {
        list.push(Ship(data[0], data[1]));
      } else {
        list.push(Ship(data[0]));
      }
    });
    return list;
  }

  function populateShipRandomly(player, shiplist) {
    let allplaceable = true;
    let tries = 0;

    do {
      player.resetBoard();
      shiplist.forEach((ship) => {
        let placement = randomlyPlaceShip(ship, player);
        if (!placement) allplaceable = false;
      });
      tries++;
      if (tries > 100)
        throw new Error(
          "Struggles to randomize ships, reduce it number or increase board size"
        );
    } while (!allplaceable);
  }

  function randomlyPlaceShip(ship, player) {
    let tries = 0;
    let board = player.getBoard();
    let canPlace = false;
    let x;
    let y;

    while (tries < 100) {
      x = Math.floor(Math.random() * boardsize);
      y = Math.floor(Math.random() * boardsize);

      const shipCoordinates = [];
      for (let i = 0; i < ship.getLength(); i++) {
        if (ship.isVertical()) {
          shipCoordinates.push([x, y + i]);
        } else shipCoordinates.push([x + i, y]);
      }

      let alltrue = true;
      shipCoordinates.forEach((sc) => {
        if (!board.isAreaClear(sc)) {
          alltrue = false;
        }
      });

      if (alltrue) {
        board.placeShip(ship, [x, y]);
        canPlace = true;
        break;
      }
      tries++;
    }

    return canPlace;
  }

  function createBoardNode(player) {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("boardContainer");
    boardContainer.style.cssText = `--boardsize: ${boardsize}`;

    for (let i = 0; i < boardsize * boardsize; i++) {
      const grid = document.createElement("div");
      const x = i % boardsize;
      const y = Math.floor(i / boardsize);
      grid.classList.add("grid");

      if (player.getBoard().getGrid([x, y]).ship !== null) {
        grid.classList.add("occupied");
      }

      boardContainer.appendChild(grid);
    }
    return boardContainer;
  }

  function addAttackButtons(computer, computerNode, human, humanNode) {
    const grids = computerNode.querySelectorAll(".grid");
    grids.forEach((grid, i) => {
      const x = i % boardsize;
      const y = Math.floor(i / boardsize);
      const button = document.createElement("button");
      button.classList.add("gridButton");
      grid.classList.remove("occupied");

      button.addEventListener("click", () => {
        attackEvent([x, y], grid, computer, computerNode, human, humanNode);
      });

      grid.appendChild(button);
    });
  }

  function attackEvent(
    target,
    gridNode,
    computer,
    computerNode,
    human,
    humanNode
  ) {
    const shipHit = computer.getBoard().receiveAttack(target);
    gridNode.removeChild(gridNode.firstChild);
    markHit(gridNode);
    if (shipHit) {
      gridNode.classList.add("occupied");
      if (checkLose(computer)) {
        disableButtonToggle(computerNode, false);
        info.textContent = human.getName() + " wins!";
      }
    } else {
      disableButtonToggle(computerNode, false);
      let isHumanHit;
      let coordinate;

      const counterAttack = setInterval(function () {
        coordinate = computer.choose();
        isHumanHit = human.getBoard().receiveAttack(coordinate);

        if (isHumanHit) {
          if (human.getBoard().getGrid(coordinate).ship.isSunk()) {
            computer.clearRecentHit();
          } else {
            computer.addRecentHit(coordinate);
          }
        }

        const targetNode = findNode(humanNode, coordinate);
        markHit(targetNode);

        if (!isHumanHit) {
          disableButtonToggle(computerNode, true);
          clearInterval(counterAttack);
        }

        if (checkLose(human)) {
          info.textContent = computer.getName() + " wins!";
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

import { Player, ComputerPlayer } from "./player.js";
import Ship from "./ship.js";

function Dom() {
  const main = document.querySelector(".main");
  const info = document.querySelector(".info");
  const rightbox = document.querySelector(".rightbox");
  const leftbox = document.querySelector(".leftbox");
  let boardsize;
  let human;
  let computer;
  let humanBoardNode;
  let computerBoardNode;

  function setUpNewGame(size, shipsData) {
    boardsize = size;

    human = new Player(size);
    populateShipRandomly(human, createRandomShipList(shipsData));
    humanBoardNode = createBoardNode(human);
    rightbox.appendChild(humanBoardNode);

    const placementDiv = document.createElement('div');
    placementDiv.classList.add("placement");

    const randomizebtn = document.createElement('button');
    randomizebtn.textContent = "RANDOMIZE";
    randomizebtn.addEventListener('click', () => {
      rightbox.removeChild(humanBoardNode);
      populateShipRandomly(human, createRandomShipList(shipsData));
      humanBoardNode = createBoardNode(human);
      rightbox.appendChild(humanBoardNode);
    })
    placementDiv.appendChild(randomizebtn);

    leftbox.appendChild(placementDiv);



    /*
    computer = new ComputerPlayer(size);
    populateShipRandomly(computer, createRandomShipList(shipsData));
    computerBoardNode = createBoardNode(computer);
    addAttackButtons(computerBoardNode);

    main.appendChild(humanBoardNode);
    main.appendChild(computerBoardNode);
    */
  }

  function createRandomShipList(shipsData) {
    const list = [];
    shipsData.forEach((data) => {
      const chance = Math.random();
      if (chance > 0.5) list.push(Ship(data));
      else list.push(Ship(data,true));
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

  function addAttackButtons(boardNode) {
    const grids = boardNode.querySelectorAll(".grid");
    grids.forEach((grid, i) => {
      const x = i % boardsize;
      const y = Math.floor(i / boardsize);
      const button = document.createElement("button");
      button.classList.add("gridButton");
      grid.classList.remove("occupied");

      button.addEventListener("click", () => {
        humanAttack([x, y], grid);
      });

      grid.appendChild(button);
    });
  }

  function humanAttack(target, gridNode) {
    const shipHit = computer.getBoard().receiveAttack(target);
    gridNode.removeChild(gridNode.firstChild);
    markHit(gridNode);
    if (shipHit) {
      gridNode.classList.add("occupied");
      if (checkLose(computer)) {
        disableButtonToggle(computerBoardNode, false);
        info.textContent = human.getName() + " wins!";
      }
    } else {
      computerAttack();
    }
  }

  function computerAttack() {
    disableButtonToggle(computerBoardNode, false);
    let isHumanHit;
    let coordinate;

    const attackLoop = setInterval(function () {
      coordinate = computer.choose();
      isHumanHit = human.getBoard().receiveAttack(coordinate);

      if (isHumanHit) {
        if (human.getBoard().getGrid(coordinate).ship.isSunk()) {
          computer.clearRecentHit();
        } else {
          computer.addRecentHit(coordinate);
        }
      }

      const targetNode = findNode(humanBoardNode, coordinate);
      markHit(targetNode);

      if (!isHumanHit) {
        disableButtonToggle(computerBoardNode, true);
        clearInterval(attackLoop);
      }

      if (checkLose(human)) {
        info.textContent = computer.getName() + " wins!";
        clearInterval(attackLoop);
      }
    }, 1000);
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

import { Player, ComputerPlayer } from "./player.js";
import Ship from "./ship.js";

function Dom() {
  const main = document.querySelector(".main");
  const log = document.querySelector(".log");
  const buttonContainer = document.querySelector(".btncontainer");
  let boardsize;
  let shipsInPlay;
  let human;
  let computer;
  let humanBoardNode;
  let computerBoardNode;

  function setUpNewGame(size, shipsData) {
    boardsize = size;
    shipsInPlay = shipsData;

    human = new Player(size);
    populateShipRandomly(human, createRandomShipList(shipsData));
    humanBoardNode = createBoardNode(human);
    main.appendChild(humanBoardNode);

    computer = new ComputerPlayer(size);
    populateShipRandomly(computer, createRandomShipList(shipsData));
    computerBoardNode = createBoardNode(computer);
    addAttackButtons(computerBoardNode);
    main.appendChild(computerBoardNode);
    disableButtonToggle(computerBoardNode, false);

    log.textContent =
      "Click RANDOMIZE to reshuffle your ships or START to begin.";

    const randomizebtn = document.createElement("button");
    randomizebtn.textContent = "RANDOMIZE";
    randomizebtn.addEventListener("click", () => {
      main.removeChild(humanBoardNode);
      populateShipRandomly(human, createRandomShipList(shipsData));
      humanBoardNode = createBoardNode(human);
      main.insertBefore(humanBoardNode, computerBoardNode);
    });

    const startbtn = document.createElement("button");
    startbtn.textContent = "START";
    startbtn.addEventListener("click", humanReady);

    buttonContainer.appendChild(randomizebtn);
    buttonContainer.appendChild(startbtn);
  }

  function createRandomShipList(shipsData) {
    const list = [];
    shipsData.forEach((data) => {
      const chance = Math.random();
      if (chance > 0.5) list.push(Ship(data));
      else list.push(Ship(data, true));
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

  function highlightBoard(player) {
    if (player === computer) {
      computerBoardNode.classList.add("highlight");
      humanBoardNode.classList.remove("highlight");
    }
    if (player === human) {
      computerBoardNode.classList.remove("highlight");
      humanBoardNode.classList.add("highlight");
    }
  }

  function humanReady() {
    while (buttonContainer.firstChild) {
      buttonContainer.removeChild(buttonContainer.firstChild);
    }
    disableButtonToggle(computerBoardNode, true);
    highlightBoard(computer);
    log.textContent = "Your move";
  }

  function humanAttack(target, gridNode) {
    const shipHit = computer.getBoard().receiveAttack(target);
    gridNode.removeChild(gridNode.firstChild);
    markHit(gridNode);
    if (shipHit) {
      log.textContent = "Hit! you can attack again";
      gridNode.classList.add("occupied");

      if (computer.getBoard().getGrid(target).ship.isSunk()) {
        const sunkenShip = computer.getBoard().getGrid(target).ship;
        colorSunkShip(computerBoardNode, sunkenShip);
        log.textContent = "Ship sunk! you can attack again";
      }

      if (checkLose(computer)) {
        endGame(human);
      }
    } else {
      computerAttack();
    }
  }

  function computerAttack() {
    highlightBoard(human);
    log.textContent = `${computer.getName()} is attacking...`;
    disableButtonToggle(computerBoardNode, false);
    let isHumanHit;
    let coordinate;

    const attackLoop = setInterval(function () {
      coordinate = computer.choose();
      isHumanHit = human.getBoard().receiveAttack(coordinate);

      if (isHumanHit) {
        log.textContent = `Hit! ${computer.getName()} is making another attack...`;
        if (human.getBoard().getGrid(coordinate).ship.isSunk()) {
          const sunkenShip = human.getBoard().getGrid(coordinate).ship;
          colorSunkShip(humanBoardNode, sunkenShip);
          log.textContent = `Ship sunk! ${computer.getName()} is making another attack...`;

          computer.filterSunkShipArea(sunkenShip.getCoordinates());
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
        highlightBoard(computer);
        log.textContent = "Your move";
      }

      if (checkLose(human)) {
        endGame(computer);
        clearInterval(attackLoop);
      }
    }, 1000);
  }

  function colorSunkShip(boardNode, ship) {
    let coordinates = ship.getCoordinates();
    coordinates.forEach((coordinate) => {
      const node = findNode(boardNode, coordinate);
      node.classList.add("sunk");
    });
  }

  function checkLose(player) {
    return player.getBoard().isAllSunk();
  }

  function endGame(winner) {
    disableButtonToggle(computerBoardNode, false);
    log.textContent = winner.getName() + " wins!";

    const replayBtn = document.createElement("button");
    replayBtn.textContent = "RESTART";

    replayBtn.addEventListener("click", () => {

      log.textContent = "RESTARTING..."

      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }

      log.textContent = "";

      while (buttonContainer.firstChild) {
        buttonContainer.removeChild(buttonContainer.firstChild);
      }

      setUpNewGame(boardsize, shipsInPlay);

    });

    buttonContainer.appendChild(replayBtn);
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

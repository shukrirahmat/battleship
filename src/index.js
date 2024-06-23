import Player from "./player.js";
import Ship from "./ship.js";
import "./styles.css";

const SIZE = 8;
const main = document.querySelector(".main");

setUpNewGame();

function setUpNewGame() {
    const human = new Player(SIZE);
    const computer = new Player(SIZE);
    populateShip(human, computer);
    main.appendChild(createHumanBoard(human));
    main.appendChild(createComputerBoard(computer));
}

function populateShip(human, computer) {

    human.getBoard().placeShip(Ship(1), [1,1]);
    human.getBoard().placeShip(Ship(2), [2,4]);
    human.getBoard().placeShip(Ship(3, true), [6,3]);

    computer.getBoard().placeShip(Ship(1), [1,1]);
    computer.getBoard().placeShip(Ship(2), [2,4]);
    computer.getBoard().placeShip(Ship(3, true), [6,3]);
}

function createHumanBoard(player) {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("boardContainer");

    for (let i = 0; i < SIZE * SIZE; i++) {
        const grid = document.createElement("div");
        const x = i % 8;
        const y = Math.floor(i / 8);
        //grid.textContent = x + " , " + y;
        grid.classList.add("grid");
        if (player.getBoard().getGrid([x,y]).ship !== null) {
            grid.classList.add("occupied");
        }
        boardContainer.appendChild(grid);
    }
    return boardContainer;
}

function createComputerBoard(player) {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("boardContainer");

    for (let i = 0; i < SIZE * SIZE; i++) {
        const grid = document.createElement("div");
        boardContainer.appendChild(grid);
    }
    return boardContainer;
}
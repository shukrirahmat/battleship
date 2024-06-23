import Player from "./player.js";
import Ship from "./ship.js";
import "./styles.css";

const SIZE = 8;
const main = document.querySelector(".main");

setUpNewGame();

function setUpNewGame() {
    const human = new Player(SIZE);
    const computer = new Player(SIZE);
    main.appendChild(createGrid(human));
    main.appendChild(createGrid(computer));

    populateShip(human, computer);
}

function populateShip(human, computer) {

    human.getBoard().placeShip(Ship(1), [1,1]);
    human.getBoard().placeShip(Ship(2), [3,2]);
    human.getBoard().placeShip(Ship(3, true), [5,3]);

    computer.getBoard().placeShip(Ship(1), [1,1]);
    computer.getBoard().placeShip(Ship(2), [3,2]);
    computer.getBoard().placeShip(Ship(3, true), [5,3]);
}

function createGrid(player) {
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("boardContainer");

    for (let x = 0; x < SIZE * SIZE; i++) {
        const button = document.createElement("button");
        boardContainer.appendChild(button);
    }
    return boardContainer;
}
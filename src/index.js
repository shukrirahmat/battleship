import Player from "./player.js";
import Ship from "./ship.js";
import "./styles.css";

setUpNewGame();

function setUpNewGame() {
    const human = new Player();
    const computer = new Player();

    human.getBoard().placeShip(Ship(1), [1,1]);
    human.getBoard().placeShip(Ship(2), [3,2]);
    human.getBoard().placeShip(Ship(3, true), [5,3]);

    computer.getBoard().placeShip(Ship(1), [1,1]);
    computer.getBoard().placeShip(Ship(2), [3,2]);
    computer.getBoard().placeShip(Ship(3, true), [5,3]);

}
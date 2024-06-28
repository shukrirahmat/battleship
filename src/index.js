import dom from "./dom.js";
import "./styles.css";

const SIZE = 8;
const shipsData = [[3], [3,true], [2], [2, true], [1], [1]];
dom.setUpNewGame(SIZE, shipsData);

//TASKS NEXT:
//1) Make smarter AI;
//2) Placing ships;

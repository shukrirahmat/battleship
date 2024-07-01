import dom from "./dom.js";
import "./styles.css";

const SIZE = 8;
const shipsData = [[3], [3,true], [2], [2, true], [1], [1]];
dom.setUpNewGame(SIZE, shipsData);

//TASKS NEXT:
//1) Fix AI wrong choice because recent hit not in order
//2) refresh possible target by not attacking obviously empty
//3) or disable all surrounding area when ship is sunk; 

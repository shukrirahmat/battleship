import dom from "./dom.js";
import "./styles.css";

const SIZE = 8;
const shipsData = [3, 3, 2, 2, 1, 1];
dom.setUpNewGame(SIZE, shipsData);

/* NEXT TASK:
1) signals when ship is sunk;
2) improve ai avoiding to attack adjacent sunk ship
3) allows replay
*/

import Gameboard from "./gameboard.js";

function Player(boardsize, name = "Player") {
  let board = Gameboard(boardsize);
  const getBoard = () => board;
  const getName = () => name;
  const resetBoard = () => {
    board = Gameboard(boardsize);
  };

  return {
    getName,
    getBoard,
    resetBoard,
  };
}

function computerController(computer) {
  let size = computer.getBoard().getSize();
  let possibleTarget = setUpPossibleTarget();
  let recentHits = [];

  function choose() {
    let choice = null;
    let index;

    if (possibleTarget.length === 0) {
      throw new Error ("no possible moves for computer, should not happen before the game is over")
    };
    if (recentHits.length > 0) {
      const filteredTargets = figureOutNextHit();
      if (filteredTargets.length > 0) {
        const fIndex = Math.floor(Math.random() * filteredTargets.length);
        choice = filteredTargets[fIndex];
        index = possibleTarget.indexOf(choice);
      }
    }

    if (choice === null) {
      index = Math.floor(Math.random() * possibleTarget.length);
      choice = possibleTarget[index];
    }
    possibleTarget.splice(index, 1);
    return choice;
  }

  function figureOutNextHit() {
    let choices;

    if (recentHits.length === 1) {
      choices = possibleTarget.filter((target) => {
        let xdiff = Math.abs(target[0] - recentHits[0][0]);
        let ydiff = Math.abs(target[1] - recentHits[0][1]);
        return (xdiff === 1 && ydiff === 0) || (ydiff === 1 && xdiff === 0);
      });
    }

    if (recentHits.length > 1) {
      if (recentHits[0][0] === recentHits[1][0]) {
        choices = possibleTarget.filter((target) => {
          const xdiff = target[0] === recentHits[0][0];
          const ydiffstart = target[1] === recentHits[0][1] - 1;
          const ydiffend = target[1] === recentHits.at(-1)[1] + 1;
          return xdiff && (ydiffstart || ydiffend);
        });
      } else {
        choices = possibleTarget.filter((target) => {
          const ydiff = target[1] === recentHits[0][1];
          const xdiffstart = target[0] === recentHits[0][0] - 1;
          const xdiffend = target[0] === recentHits.at(-1)[0] + 1;
          return ydiff && (xdiffstart || xdiffend);
        });
      }
    }
    return choices;
  }

  function setUpPossibleTarget() {
    let list = [];

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        list.push([x, y]);
      }
    }
    return list;
  }

  function filterSunkShipArea(coordinates) {
    const xstart = coordinates.at(0)[0] - 1;
    const xend = coordinates.at(-1)[0] + 1;
    const ystart = coordinates.at(0)[1] - 1;
    const yend = coordinates.at(-1)[1] + 1;

    possibleTarget = possibleTarget.filter((target) => {
      const withinrange =
        target[0] >= xstart &&
        target[0] <= xend &&
        target[1] >= ystart &&
        target[1] <= yend;
      return (!withinrange);
    });
  }

  function addRecentHit(coordinate) {
    if (recentHits.length === 0) recentHits.push(coordinate);
    else {
      let end = recentHits.at(-1);
      if (coordinate[0] === end[0]) {
        if (coordinate[1] > end[1]) recentHits.push(coordinate);
        else recentHits.unshift(coordinate);
      } else {
        if (coordinate[0] > end[0]) recentHits.push(coordinate);
        else recentHits.unshift(coordinate);
      }
    }
  }

  function clearRecentHit() {
    recentHits = [];
  }

  return {
    choose,
    addRecentHit,
    clearRecentHit,
    filterSunkShipArea
  };
}

function ComputerPlayer(boardsize, name = "Computer") {
  const computer = Player(boardsize, name);

  return {
    ...computer,
    ...computerController(computer),
  };
}

export { Player, ComputerPlayer };

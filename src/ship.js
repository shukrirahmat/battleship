function Ship(length, vertical = false) {
  let hitsTaken = 0;

  function hit() {
    hitsTaken++;
  }

  function isSunk() {
    return hitsTaken >= length;
  }

  function isVertical() {
    return vertical;
  }

  function getLength() {
    return length;
  }

  return {
    getLength,
    hit,
    isSunk,
    isVertical
  };
}

export default Ship;

function Ship(length) {
  let hitsTaken = 0;

  function hit() {
    hitsTaken++;
  }

  function isSunk() {
    return hitsTaken >= length;
  }

  return {
    hit,
    isSunk,
  };
}

export default Ship;

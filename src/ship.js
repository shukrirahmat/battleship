function Ship(length, vertical = false) {
  let hitsTaken = 0;
  let coordinates;

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

  function setCoordinates(list) {
    coordinates = list;
  }

  function getCoordinates() {
    return coordinates;
  }

  return {
    getLength,
    hit,
    isSunk,
    isVertical,
    setCoordinates,
    getCoordinates
  };
}

export default Ship;

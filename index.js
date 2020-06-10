function findBestSpot(
  landWidth,
  landHeight,
  exploitationWidth,
  exploitationHeight,
  goldMines
) {
  // 1. Look how many goldmines are next to each other
  let nbOfMineNearby = [];
  goldMines.forEach((obj) => {
    const x = obj.x;
    const y = obj.y;

    const filteredMine = goldMines.filter((coord) => {
      const coordX = coord.x;
      const coordY = coord.y;
      return (
        (x + 1 === coordX && y === coordY) ||
        (x + 1 === coordX && y + 1 === coordY) ||
        (x + 1 === coordX && y - 1 === coordY) ||
        (x - 1 === coordX && y === coordY) ||
        (x - 1 === coordX && y + 1 === coordY) ||
        (x - 1 === coordX && y - 1 === coordY) ||
        (x === coordX && y + 1 === coordY) ||
        (x === coordX && y - 1 === coordY)
      );
    });

    nbOfMineNearby.push(filteredMine.length);
  });
  // 2. Collect the index of the biggest number
  const bigIndex = nbOfMineNearby.indexOf(Math.max(...nbOfMineNearby));
  // 3. Collect the coordinates with the same index
  // (indicating which mine has the most mines around it)
  const bigMine = goldMines[bigIndex];
  // 4. Using the landWidth = maximum possible x,
  // the landHeight = maximum possible y and also
  // the exploitationWidth and the exploitationHeight
  // along side with the coordinates of the mine that we got above
  // finding the best spot for the exploitation

  return {
    coordinates: {
      x: 0,
      y: 0,
    },
    goldMines: 0,
  };
}

module.exports = findBestSpot;

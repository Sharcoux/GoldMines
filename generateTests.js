const fs = require('fs');

const stream = fs.createWriteStream("index.test.js");
stream.write('const findBestSpot = require("./index.js");\n\n');

function createRandomTest(title) {
  const a = getRandomInt(100);
  const b = getRandomInt(100);
  const x = getRandomInt(a);
  const y = getRandomInt(b);
  const n = getRandomInt(a*b);
  createPrebuildTest(a,b,x,y,n, `random test ${id}`);
}

let count = 0;
function createPrebuildTest(a, b, x, y, n, title) {
  const list = [];
  const map = [];
  for(i=0; i<n; i++) {
    const coord = {x: getRandomInt(a), y: getRandomInt(b)};
    if(!map[coord.x]) map[coord.x] = [];
    if(!map[coord.x][coord.y]) {
      map[coord.x][coord.y] = true;
      list.push(coord);
    }
  }
  const result = resolve(a,b,x,y,list);
  count++;
  stream.write(`
    describe('test ${count}',() => {
      test('${title}', () => {
        expect(findBestSpot(${a}, ${b}, ${x}, ${y}, ${JSON.stringify(list)})).toEqual(${JSON.stringify(result)});
      });
    });
  `);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function resolve(a, b, x, y, list) {
  const map = [];
  list.forEach(mine => {
    map[mine.x] = map[mine.x] || [];
    map[mine.x][mine.y] = true;
  });
  let best = {
    coordinates: {x: 0, y: 0},
    goldMines: 0,
  }
  for(i=0; i<=a-x; i++) {
    for(j=0; j<=b-y; j++) {
      const result = {
        coordinates : {x: i, y: j},
        goldMines : 0,
      }
      for(k=0; k<x; k++) {
        for(l=0; l<y; l++) {
          if(map[k+i] && map[k+i][l+j]) result.goldMines++;
        }
      }
      if(result.goldMines>best.goldMines) best = result;
    }
  }
  return best;
}

createPrebuildTest(1, 1, 1, 1, 1, 'one space, one mine');
createPrebuildTest(1, 1, 1, 1, 0, 'one space, no mine');
createPrebuildTest(1, 1, 0, 0, 1, 'no money');
createPrebuildTest(1, 1, 1, 0, 1, 'no money 2');
createPrebuildTest(1, 1, 0, 1, 1, 'no money 3');
createPrebuildTest(0, 0, 0, 0, 0, 'no land');
createPrebuildTest(0, 1, 1, 1, 1, 'no land 2');
createPrebuildTest(1, 0, 1, 1, 1, 'no land 3');
createPrebuildTest(1, 2, 1, 2, 1, 'two spaces, one mine');
createPrebuildTest(2, 2, 1, 1, 8, 'multiple options');
createPrebuildTest(1, 10, 1, 3, 10, 'one row');
createPrebuildTest(10, 1, 3, 1, 10, 'one column');
createPrebuildTest(100, 100, 25, 25, 100, 'large numbers');

for(id=0;id<20;id++) {
  createRandomTest(id);
}

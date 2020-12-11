const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

let state = input.map(line => [...line]);
function getAdjacentOcc(state, x, y) {
  const checks = [
    [-1,-1], [-1,0], [-1,1],
    [0,-1], [0,1],
    [1,-1], [1,0], [1,1],
  ]

  return checks.reduce((acc, [yi,xi]) => {
    let i=0;
    while(++i) {
      const v = state[y+yi*i]?.[x+xi*i];
      if (!v || v !== '.') return acc.push(v), acc;
    }
  }, []).filter(v => v === '#')
}

function gen(state) {
  const newState = JSON.parse(JSON.stringify(state));
  state.forEach((line, y) => {
    line.forEach((v, x) => {
      switch(v) {
        case 'L':
          const isFree = getAdjacentOcc(state, x, y).length === 0;
          isFree && (newState[y][x] = '#');
          break;
        case '#':
          const isFull = getAdjacentOcc(state, x, y).length >= 5;
          isFull && (newState[y][x] = 'L');
          break;
      }
    })
  });
  return newState;
}

function draw(state) {
  const str = state.map(line => line.join('')).join('\n');
  console.log(str);
}

let i=0;
while(++i) {
  const prevState = state;
  state = gen(state);
  if (prevState+'' === state+'') break;
  console.log(`\n\n GEN ${i}>`);
  draw(state);
}

console.log(
  (state+'').match(/#/g)?.length
);

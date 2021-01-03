const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');
const moves = input.map(seq => [...seq.matchAll(/[ns]?[we]/g)]);
const WHITE = undefined, BLACK = 1;

let pos=[0,0], state={};
const MOVES={nw:[-1,-1],ne:[1,-1],e:[2,0],w:[-2,0],sw:[-1,1],se:[1,1]}
function move(dir){ const [x,y]=MOVES[dir];pos[0]+=x;pos[1]+=y;}
moves.forEach((dirs) => {
  pos=[0,0];
  dirs.forEach(move);
  state[pos] ? (delete state[pos]) : (state[pos] = BLACK);
});

const CHECKS = Object.values(MOVES);
function getAdjacent(state, find, xyKey) {
  const [x,y] = xyKey.split(',').map(Number);
  return CHECKS.reduce((acc, [xi,yi]) => {
    if (xi || yi) {
      const k=[x+xi,y+yi], v=state[k];
      if (v === find) acc.push(k+'');
    }
    return acc;
  }, []);
}

for (let i = 0; i < 100; i++) {
  const blackTiles = Object.keys(state).filter((k)=>state[k]);
  const newState = {...state};

  // ... iterate black tiles, check surroundings
  blackTiles.flatMap(k => {
    // Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
    const blacks = getAdjacent(state, BLACK, k).length;
    if (!blacks || blacks > 2) delete newState[k];

    // -> Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
    const whites = getAdjacent(state, WHITE, k);
    whites.forEach(k => {
      const has2b = getAdjacent(state, BLACK, k).length === 2;
      if (has2b) newState[k] = BLACK;
    });
  });

  const blacks = Object.values(newState).filter(Boolean).length;
  console.log(`Day ${i+1}: ${blacks}`);
  state = newState;
}

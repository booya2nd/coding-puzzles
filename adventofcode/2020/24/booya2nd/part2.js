const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');
const moves = input.map(seq => [...seq.matchAll(/[ns]?[we]/g)]);
const BLACK = 1, WHITE = undefined;

let pos=[0,0], state={};
const MOVES={nw:[-1,-1],ne:[1,-1],e:[2,0],w:[-2,0],sw:[-1,1],se:[1,1]}
function move(dir){ const [x,y]=MOVES[dir];pos[0]+=x;pos[1]+=y;}
moves.forEach((dirs) => {
  pos=[0,0];
  dirs.forEach(move);
  state[pos] ? (delete state[pos]) : (state[pos] = BLACK);
});

const blackTiles = Object.keys(state).filter((k)=>state[k]);
console.log(blackTiles);

const CHECKS = Object.values(MOVES);
const K = xyKey => xyKey.split(',').map(Number);
function getAdjacent(state, find, xyKey) {
  const [x,y] = K(xyKey);
  return CHECKS.reduce((acc, [xi,yi]) => {
    const k=[x+xi,y+yi], v=state[k];
    if (v === find) acc.push(k+'');
    return acc;
  }, []);
}

const I = Infinity;
function draw(state, marks = {}){
  const WHITE = ' ◽ ', BLACK = ' ⬛ ', X = '   ';
  const blacks = Object.keys(state).map(k => k.split(','));
  const [xs,ys] = [blacks.map(([x])=>x), blacks.map(([,y])=>y)];
  const [XMIN,XMAX,YMIN,YMAX] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const [WIDTH, HEIGHT] = [Math.abs(XMAX-XMIN), Math.abs(YMAX-YMIN)];

  if (!blacks.length) return;
  console.log('========',[[XMIN,YMIN],[XMAX,YMAX]],'========');

  const data = [];
  for (let y = YMIN-1; y <= YMAX+1; y++) {
    data.push([]);
    for (let x = XMIN-1; x <= XMAX+1; x++) {
      const isField = Math.abs(x%2) === Math.abs(y%2);
      let d = state[[x,y]] ? BLACK : (isField ? WHITE : X);

      const mark = Object.entries(marks).find(([, marks]) => marks.includes([x,y]+''));
      if (mark) d = mark[0];
      data[data.length-1].push(d);
    }
  }

  const index = n => '-±+'[Math.sign(n)+1] + Math.abs(n);
  console.log(marks)
  console.log('   ',[...Array(WIDTH+1)].map((_,i) => index(i+XMIN)).join(' '));
  console.log(data.map((x,i) => index(i+YMIN) + ' ' + x.join('')).join('\n'));
}

// draw(state);
for (let i = 0; i < 2; i++) {
  const newState = {...state};


  const marks = {' 🏴 ': [], ' 🏳 ': []};
  // ... iterate black tiles, collect whites
  const whiteTiles = blackTiles.flatMap(k => {
    // Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
    const blacks = getAdjacent(state, BLACK, k).length;
    if (!blacks || blacks > 2) {
      delete newState[k];
      marks[' 🏳 '].push(k);
    }
    return getAdjacent(state, WHITE, k);
  });

  const newBlacks = [];
  new Set(whiteTiles).forEach(k => {
    // -> Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
    const has2b = getAdjacent(state, BLACK, k).length === 2;
    if (has2b) {
      newState[k] = BLACK;
      marks[' 🏴 '].push(k);
    }
  });

  draw(newState);

  const blacks = Object.values(newState).filter(Boolean).length;
  console.log(`Day ${i+1}: ${blacks}`);
  console.log(newBlacks);

  state = newState;
}

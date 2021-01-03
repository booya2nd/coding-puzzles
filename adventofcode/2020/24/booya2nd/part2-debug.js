const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');
const moves = input.map(seq => [...seq.matchAll(/[ns]?[we]/g)]);
const BLACK = 1, WHITE = undefined;
const DRAW_SCALES = false;
const DEBUGMODE = true;

let pos=[0,0], state={};
const MOVES={nw:[-1,-1],ne:[1,-1],e:[2,0],w:[-2,0],sw:[-1,1],se:[1,1]}
function move(dir){ const [x,y]=MOVES[dir];pos[0]+=x;pos[1]+=y;}
moves.forEach((dirs) => {
  pos=[0,0];
  dirs.forEach(move);
  state[pos] ? (delete state[pos]) : (state[pos] = BLACK);
});

const getBlacks = state => Object.keys(state).filter((k)=>state[k]);

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
  const $ = s => DRAW_SCALES ? ` ${s} ` : s;
  const [WHITE, BLACK, EMPTY] = ['∙','⬡',' '].map($);
  const blacks = Object.keys(state).map(k => k.split(','));
  const [xs,ys] = [blacks.map(([x])=>x), blacks.map(([,y])=>y)];
  let [XMIN,XMAX,YMIN,YMAX] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  [XMIN,XMAX,YMIN,YMAX] = [-7,7,-4,4];
  const [WIDTH, HEIGHT] = [Math.abs(XMAX-XMIN), Math.abs(YMAX-YMIN)];
  const PAD = 0;

  if (!blacks.length) return;
  // console.log('========',[[XMIN,YMIN],[XMAX,YMAX]],'========');

  const data = [];
  for (let y = YMIN-PAD; y <= YMAX+PAD; y++) {
    data.push([]);
    for (let x = XMIN-PAD; x <= XMAX+PAD; x++) {
      const isField = Math.abs(x%2) === Math.abs(y%2);
      let d = state[[x,y]] ? BLACK : (isField ? WHITE : EMPTY);

      const mark = Object.entries(marks).find(([, marks]) => marks.includes([x,y]+''));
      if (mark) d = $(mark[0]);
      data[data.length-1].push(d);
    }
  }

  const index = n => '-±+'[Math.sign(n)+1] + Math.abs(n);
  DRAW_SCALES && console.log('   '+[...Array(WIDTH+1)].map((_,i) => index(i+XMIN)).join(' '));
  console.log(data.map((x,i) => {
    const pre = DRAW_SCALES ? index(i+YMIN) + ' ' : '';
    return pre + x.join('');
  }).join('\n'));
  console.log('\n');
}


const s = (a,b) => {
  const dx = K(a)[0] - K(b)[0], dy = K(a)[1] - K(b)[1];
  return dx ? dx : dy
}

draw(state);
for (let i = 0; i < 2; i++) {
  const blackTiles = getBlacks(state).sort(s);
  const newState = {...state};

  const _BLACK = '➕', _WHITE = '➖';
  const marks = {[_BLACK]: [], [_WHITE]: []};
  // ... iterate black tiles, collect whites
  console.log('... remove blacks if ⬢ has 0 or >2 ❔');
  blackTiles.flatMap(k => {
    // Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
    const blacks = getAdjacent(state, BLACK, k);
    if (!blacks.length || blacks.length > 2) {
      delete newState[k];
      marks[_WHITE].push(k);
    }
    DEBUGMODE && draw(state, {'❔':[k],'⬢':blacks,...marks});
  });


  const whiteTiles = [...new Set(blackTiles.flatMap(b => getAdjacent(state, WHITE, b)))].sort(s);
  console.log('... add ⬢ if ❔ has exactly 2 ⬢ ');
  whiteTiles.forEach(k => {
    // -> Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
    const blacks = getAdjacent(state, BLACK, k);
    if (blacks.length === 2) {
      newState[k] = BLACK;
      marks[_BLACK].push(k);
    }
    DEBUGMODE && draw(state, {'❔':[k],'⬢':blacks,...marks});
  });



  const blacks = Object.values(newState).filter(Boolean).length;
  console.log(`Day ${i+1}: ${blacks}`);
  DEBUGMODE ? draw(newState, marks) : draw(newState);

  state = newState;
}

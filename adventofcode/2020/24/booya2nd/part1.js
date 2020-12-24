const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');
const moves = input.map(seq => [...seq.matchAll(/[ns]?[we]/g)]);

let pos=[0,0], state={};
const MOVES={nw:[-1,-1],ne:[1,-1],e:[2,0],w:[-2,0],sw:[-1,1],se:[1,1]}
function move(dir){ const [x,y]=MOVES[dir];pos[0]+=x;pos[1]+=y;}
moves.forEach((dirs) => {
  pos=[0,0];
  dirs.forEach(move);
  state[pos] = !state[pos];
});

console.log(Object.values(state).filter(Boolean).length);

const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');
const $ = n => (n<0 ? 360+(n%360) : n) % 360;

const FACINGS = { 0:'E',90:'S',180:'W',270:'N' };
const MOVES = {
  S: n => state.y += n, N: n => state.y -= n,
  E: n => state.x += n, W: n => state.x -= n,
  R: n => state.d += n, L: n => state.d -= n,
  F: n => MOVES[FACINGS[$(state.d)]](n)
}

const state = { d: 0, x: 0, y: 0 }
input.forEach( (instr, i) => {
  const [,dir,val] = instr.match(/(.)(\d+)/);
  MOVES[dir](val*1);
});

console.log(Math.abs(state.x) + Math.abs(state.y));


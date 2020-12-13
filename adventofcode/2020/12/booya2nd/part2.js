const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');
const rot = (state, deg) => {
  const rad = deg * Math.PI/180;
  const x = (state.v.x * Math.cos(rad)|0) - (state.v.y * Math.sin(rad)|0);
  const y = (state.v.x * Math.sin(rad)|0) + (state.v.y * Math.cos(rad)|0);
  state.v.x = x; state.v.y = y;
}

const MOVES = {
  S: n => state.v.y += n, N: n => state.v.y -= n,
  E: n => state.v.x += n, W: n => state.v.x -= n,
  R: n => rot(state, n), L: n => rot(state, -n),
  F: n => {
    state.x += state.v.x * n;
    state.y += state.v.y * n;
  }
}

const state = { x: 0, y: 0, v: { x: 10, y: -1 } }
input.forEach( (instr, i) => {
  const [,dir,val] = instr.match(/(.)(\d+)/);
  MOVES[dir](val*1);
});

console.log(Math.abs(state.x) + Math.abs(state.y));


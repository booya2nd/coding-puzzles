const text = require('fs').readFileSync('input.txt', 'utf8');
const input = text.trim().split('\n');

const state = [];

function toggle([x1,y1], [x2,y2], set){
  for (let y=y1; y<=y2; y++) {
    for (let x=x1; x<=x2; x++) {
      const v = (state[y]||=[])[x];
      state[y][x] = set ?? !v;
    }
  }
}

const ops = {
  'turn on': (a,b) => toggle(a,b, true),
  'turn off': (a,b) => toggle(a,b, false),
  'toggle': (a,b) => toggle(a,b),
}

input.forEach(instr => {
  const [, op, x1, y1, x2, y2] = instr.match(/(.+) (\d+),(\d+) through (\d+),(\d+)/);
  ops[op]([x1*1,y1*1], [x2*1,y2*1]);
})

console.log(
  state.flat().filter(Boolean).length,
);

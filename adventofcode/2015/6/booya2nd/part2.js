const text = require('fs').readFileSync('input.txt', 'utf8');
const input = text.trim().split('\n');

const state = [];

function toggle([x1,y1], [x2,y2], lum){
  for (let y=y1; y<=y2; y++) {
    for (let x=x1; x<=x2; x++) {
      (state[y]||=[])[x]||=0;
      state[y][x] = Math.max(0, lum + state[y][x]);
    }
  }
}

const ops = {
  'turn on': (a,b) => toggle(a,b, 1),
  'turn off': (a,b) => toggle(a,b, -1),
  'toggle': (a,b) => toggle(a,b, 2),
}

input.forEach(instr => {
  const [, op, x1, y1, x2, y2] = instr.match(/(.+) (\d+),(\d+) through (\d+),(\d+)/);
  ops[op]([x1*1,y1*1], [x2*1,y2*1]);
})

console.log(
  state.flat().reduce((acc,n) => acc+n)
);

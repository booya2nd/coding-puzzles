const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const position = [0,0];
const DIRS = {forward: [1,0], down: [0,1], up: [0,-1]};
function calc(instr) {
  const [dir,n] = instr.split(' ');
  const [x,y] = DIRS[dir].map(i => i*n);
  position[0] += x;
  position[1] += y;
}

input.forEach(calc);

console.log(position[0] * position[1]);

const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const position = [0,0];
let aim = 0;
const INSTR = {
  forward: n => {
    position[0] += n;
    position[1] += aim*n;
  },
  up: n => aim -= n,
  down: n => aim += n
}
function calc(instr) {
  const [dir,n] = instr.split(' ');
  INSTR[dir](n*1);
}

input.forEach(calc);

console.log(position[0] * position[1]);

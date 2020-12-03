const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

const chrAtPos = (line, pos) => line[pos % line.length]
const locations = input.map(
  (line, nr) => chrAtPos(line, nr * 3)
)

console.log(
  locations.filter(x=>x==='#').length
);

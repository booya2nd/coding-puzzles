const input = require('fs').readFileSync('input.txt', 'utf8').trim().split(/\n/);
const sortNumeric = (a,b) => a-b;

const REPLACE_MAP = {
  B: 1, F: 0,
  R: 1, L: 0
}
const seatIds = input.map((line) => {
  const bin = line.replace(/./g,x => REPLACE_MAP[x]);
  const row = parseInt(bin.slice(0,7),2);
  const col = parseInt(bin.slice(7), 2);
  return row * 8 + col;
}).sort(sortNumeric);

const leftNeighbour = seatIds.find((seatId,i) =>
  seatIds[i+1]-seatId !== 1
)

console.log(leftNeighbour+1);

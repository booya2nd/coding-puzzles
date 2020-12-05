const input = require('fs').readFileSync('input.txt', 'utf8').trim().split(/\n/);

const REPLACE_MAP = {
  B: 1, F: 0,
  R: 1, L: 0
}
const highestSeatId = input.reduce((hiSeat, line) => {
  const bin = line.replace(/./g,x => REPLACE_MAP[x]);
  const row = parseInt(bin.slice(0,7),2);
  const col = parseInt(bin.slice(7), 2);
  const seatId = row * 8 + col;
  return Math.max(hiSeat, seatId);
}, 0);

console.log(highestSeatId);


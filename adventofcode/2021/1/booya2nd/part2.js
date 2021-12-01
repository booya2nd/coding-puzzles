const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n').map(Number);
const sums = [], size=3;
input.forEach((n,i) =>
  [...Array(size)].forEach((_,j) => (sums[i-j]||=0, sums[i-j]+=n))
);
sums.length = input.length-1-size;

let result = 0;
sums.reduce((a,b) => (a<b && result++, b) );
console.log(result);

const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const max = {red: 12, green: 13, blue: 14};
console.log(input.reduce(
  (s, l, i) => s + (i+1) * [...l.matchAll(/(\d+) (\w+)/g)].every(([,n,c]) => n <= max[c]), 0)
)

const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('');
const rules = [
  s => /(..).*\1/.test(s),
  s => /(.).\1/.test(s)
];

console.log(
  input.filter(s => rules.every(fn => fn(s))).length
);

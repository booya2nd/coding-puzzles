const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('');
const rules = [
  s => (s.match(/[aeiou]/g)||[]).length >= 3,
  s => /(.)\1/.test(s),
  s => !/ab|cd|pq|xy/.test(s)
];

console.log(
  input.filter(s => rules.every(fn => fn(s))).length
);

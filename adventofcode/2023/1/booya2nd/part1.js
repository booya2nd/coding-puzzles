const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const result = input.reduce((s,l)=> {
  const m = l.match(/\d/g);
  return s + (m.at(0)+m.at(-1))*1
}, 0);

console.log(result);

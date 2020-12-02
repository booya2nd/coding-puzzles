const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

const matches = [];
input.forEach((line) => {
  const [, min, max, chr, pw] = line.match(/(\d+)-(\d+) (\w): (\w+)/) || [];
  const count = pw.split(chr).length-1;
  if (count >= min && count <= max) matches.push(line);
});
console.log(matches.length);

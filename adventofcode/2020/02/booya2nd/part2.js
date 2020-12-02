const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

const matches = [];
input.forEach((line) => {
  const [, min, max, chr, pw] = line.match(/(\d+)-(\d+) (\w): (\w+)/) || [];
  if (pw[min-1] === chr ^ pw[max-1] === chr) matches.push(line);
});
console.log(matches.length);

const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = [...text.matchAll(/mul\((\d+),(\d+)\)/g)];

console.log(input.reduce((acc, [_, a, b]) => acc + a * b, 0))
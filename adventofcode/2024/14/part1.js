const text=require('fs').readFileSync('input.txt', 'utf8').trim();
console.time();
const input = [...text.matchAll(/(\d+),(\d+) v=(-?\d+),(-?\d+)/g)];

console.timeEnd();
console.log(input);
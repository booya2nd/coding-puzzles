const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = [...text.matchAll(/(do(?:n't)?|mul)\((?:(\d+),(\d+))?\)/g)];

let e = 1;
const ops = { mul: (a,b)=>a*b*e, 'do': _=>{e=1}, 'don\'t': _=>{e=0} };
console.log(input.reduce((acc, [_,op,a,b]) => acc + (ops[op](+a, +b) ?? 0), 0));

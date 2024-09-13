const text = require('fs').readFileSync('input.txt', 'utf8');
const input = text.trim().split('\n');

const m = input.reduce((x,code) => x + code.length - eval(code).length, 0);

console.log(m);
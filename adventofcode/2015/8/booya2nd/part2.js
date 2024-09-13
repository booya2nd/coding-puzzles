const text = require('fs').readFileSync('input.txt', 'utf8');
const input = text.trim().split('\n');

const m = input.reduce((x, code) => x + JSON.stringify(code).length - code.length, 0);

console.log(m);
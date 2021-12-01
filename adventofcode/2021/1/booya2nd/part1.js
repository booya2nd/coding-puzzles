const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n').map(Number);

let result = 0;
input.reduce((a,b) => (a<b && result++, b) );
console.log(result);

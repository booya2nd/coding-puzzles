const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

let x=0,max=0;
input.map(n=>n?(x+=n*1):(max=Math.max(x,max,x=0)));

console.log(max);
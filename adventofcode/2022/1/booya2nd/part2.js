const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

let x=0,max=[];
input.map(n=>n?(x+=n*1):(max.push(x),x=0));
max.sort((a,b)=>b-a);

console.log(max.slice(0,3).reduce((a,b)=>a+b));
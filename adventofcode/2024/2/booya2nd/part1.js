const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const result = input.filter(l => {
    const n = l.split(' ').map(n => +n);
    const x = n.slice(0,-1).map((v,i,_,x) => [x=n[i+1]-v,+(x>0),Math.abs(x)]);
    return x.every(([_,s,d]) => s===x[0][1] && (d>0 && d<4));
});
console.log(result.length)
const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const [t,ds] = text.replaceAll(' ','').match(/\d+/g);

let n0=Math.floor(ds/t);
while(n0*(t-n0) <= ds && ++n0);

console.log(t-n0*2+1);

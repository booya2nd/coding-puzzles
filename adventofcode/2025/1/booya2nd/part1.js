const text = require('fs').readFileSync('input.txt', 'utf8').trim();
let p=50,D={R:1,L:-1},W=100;
const w=v=>((v%W)+W)%W;
const result=[...text.matchAll(/(.)(\d+)/g)].map(([_,d,n])=>(p=w(p+D[d]*n)))


console.log(result.filter(n=>!n).length);

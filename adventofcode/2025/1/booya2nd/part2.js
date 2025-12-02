const text = require('fs').readFileSync('input.txt', 'utf8').trim();
let c=0,p=50,D={R:1,L:-1},W=100;
const w=v=>((v%W)+W)%W;
[...text.matchAll(/(.)(\d+)/g)].forEach(([_,d,n])=>{
  n=+n;
  c += (n/W|0) + (~D[d] ? p+n%W>=W : p&&p<=n%W);
  p = w(p+D[d]*n)
})

console.log(c);

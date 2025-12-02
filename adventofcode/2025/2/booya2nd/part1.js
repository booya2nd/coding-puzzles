const text = require('fs').readFileSync('input.txt', 'utf8').trim();
let r=0,R=/^(\d+)\1$/;
[...text.matchAll(/(\d+)-(\d+),/g)].map(([_,a,b])=>{
  [...Array(b-a+1)].map((_,i)=>r+=(+a+i)*R.test(+a+i))
});

console.log(r);
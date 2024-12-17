const text = require('fs').readFileSync('input.txt', 'utf8').trim();

const [f,n,s] = [[],[],[]];
[...text.matchAll(/(\d)(\d)?/g)].forEach(([_,_n,_s],i)=>{
  f.push(...Array(+_n).fill(i));
  n.push(+_n);
  s.push(+_s||0);
});

let res=[], i=0;
for (;f.length>0;i++) res.push(...f.splice(0,n[i]),...f.splice(-s[i],s[i]).reverse());

console.log(res.reduce((a,b,i)=>a+b*i,0));
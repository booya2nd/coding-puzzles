let t = require('fs').readFileSync('input.txt','utf8').split('\n');
let o=[...(t.pop()+' ').matchAll(/[+*] */g)],l,c,cols;
c=o.map(({'0':op,index:i})=>{
  l=op.length-1;
  cols=[...Array(l)].map((_,j)=>t.map(r=>r[i+l-1-j]||'').join('').trim());
  return eval(cols.join(op[0]));
}).join('+');
console.log(eval(c));
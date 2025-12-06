let [r] = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n\n');
r = r.split('\n').map(r=>r.split('-').map(Number)).sort((a,b)=>a[0]-b[0]);
let m = [r.shift()],l,a,b;
for([a,b] of r) {
  l = m.at(-1);
  if(a <= l[1]+1) l[1] = Math.max(l[1], b);
  else m.push([a,b]);
}
console.log(m.reduce((x,[a,b])=>x+b-a+1,0));

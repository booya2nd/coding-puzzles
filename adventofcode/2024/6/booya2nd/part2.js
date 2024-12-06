let text = require('fs').readFileSync('input.txt', 'utf8').trim();
let i = text.indexOf('^'); text=text.replace('^','.');
const w = text.indexOf('\n')+1;

let n=i, d=0, dir=[[0,-1],[1,0],[0, 1],[-1,0]], l=0;
const steps = new Set([[i,d]+'']);
const a = {'#':_=>d=++d%4, '.':n=>(i=n,steps.add([n,d]+'',l+=steps.has([n,(d+1)%4]+''))) };
while (text[n] in a) {
  n = i + dir[d][0] + dir[d][1]*w;
  a[text[n]]?.(n);
  const pos = [i%w, i/w|0];
  void(0);
}
console.log(l); // only counts direct intersections

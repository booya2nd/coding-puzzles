let text = require('fs').readFileSync('input.txt', 'utf8').trim();
let i = text.indexOf('^'); text=text.replace('^','.');
const w = text.indexOf('\n')+1;
const steps = new Set([i]);

let n=i, d=0, dir=[[0,-1],[1,0],[0, 1],[-1,0]];
const a = {'#':_=>d=++d%4, '.':n=>(i=n,steps.add(n)) };
while (text[n] in a) {
  n = i + dir[d][0] + dir[d][1]*w;
  a[text[n]]?.(n);
}
console.log(steps.size);

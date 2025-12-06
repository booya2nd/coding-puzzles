let [r,i] = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n\n');
//const r = [...text.matchAll(/(\d+)-(\d+)/g)].map(([,a,b])=>[a,b]);
r = r.split('\n').map(r=>r.split('-').map(Number));
n=i.split('\n').map(Number).filter(i=>r.some(r=>r[0]<=i&&i<=r[1]));
console.log(n.length);

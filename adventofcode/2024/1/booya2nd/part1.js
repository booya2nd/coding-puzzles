const text = require('fs').readFileSync('input.txt', 'utf8').trim();

const [l,r] = [...text.matchAll(/\d+/g)]
  .reduce((acc,n,i) => (acc[i%2].push(n*1),acc),[[],[]])
  .map(arr=>arr.sort((a,b)=>a-b));

const result = l.reduce((acc,_,i) => acc + Math.abs(l[i]-r[i]),0);
console.log(result);

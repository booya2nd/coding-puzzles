const text = require('fs').readFileSync('input.txt', 'utf8').trim();

const [l,r] = [...text.matchAll(/\d+/g)]
  .reduce((acc,n,i) => (acc[i%2].push(n*1),acc),[[],[]]);
const counts = r.reduce((acc,n) => ((acc[n]||=[]).push(n),acc),{});

const result = l.reduce((acc,n,i) => acc + n * (counts[n]?.length ?? 0),0);
console.log(result);

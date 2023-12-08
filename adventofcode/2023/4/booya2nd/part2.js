const text = require('fs').readFileSync('input.txt', 'utf8').trim();

const games = [...text.matchAll(/: (.*) \| (.*)/g)];
const count = [...Array(games.length)].fill(1);
games.forEach((nums, c) => {
  const [w,m] = nums.slice(1).map(n=>new Set(n.split(/\s+/)));
  let i = new Set([...w].filter(w => m.has(w))).size;
  while(i-->0) count[c+i+1]+=count[c];
});

console.log(count.reduce((a,b)=>a+b));

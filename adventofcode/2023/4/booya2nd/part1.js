const text = require('fs').readFileSync('input.txt', 'utf8').trim();

const result = [...text.matchAll(/: (.*) \| (.*)/g)].reduce((sum, nums) => {
  const [w,m] = nums.slice(1).map(n=>new Set(n.split(/\s+/)));
  const x = new Set([...w].filter(w => m.has(w))).size;
  return x ? sum + 2**(x-1) : sum;
},0);

console.log(result);


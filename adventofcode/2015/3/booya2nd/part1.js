const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('');

const pos=[0,0];
const c={[pos]: 1};
const m = { '^':[0,-1], '>':[1,0], '<':[-1,0], 'v':[0,1] };
input.forEach((d) => {
  pos[0] += m[d][0];
  pos[1] += m[d][1];
  c[pos] ||= 0; c[pos]++;
});

const result = Object.keys(c).length;
console.log(result);

const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('');

const pos=[[0,0],[0,0]];
const c={[pos[0]]: 1};
const m = { '^':[0,-1], '>':[1,0], '<':[-1,0], 'v':[0,1] };
input.forEach((d,i) => {
  const _pos = pos[i%2];
  _pos[0] += m[d][0];
  _pos[1] += m[d][1];
  c[_pos] ||= 0; c[_pos]++;
});

const result = Object.keys(c).length;
console.log(result);

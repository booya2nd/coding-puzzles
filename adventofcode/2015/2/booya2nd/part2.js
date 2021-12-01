const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

const result = input.reduce((acc, d) => {
  const [l,w,h] = x = d.split('x');
  x.sort((a,b) => a-b);
  return acc + 2*x[0] + 2*x[1] + w*h*l;
}, 0);
console.log(result);

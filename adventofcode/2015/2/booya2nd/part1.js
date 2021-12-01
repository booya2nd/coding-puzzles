const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

const result = input.reduce((acc, d) => {
  const [w,h,l] = d.split('x');
  const [a,b,c] = x = [w*l, w*h, h*l];
  return acc + 2*a+2*b+2*c + x.sort((a,b) => a-b)[0]*1;
}, 0);
console.log(result);

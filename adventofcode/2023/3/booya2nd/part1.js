const input = require('fs').readFileSync('input.txt', 'utf8');

const LEN = input.indexOf('\n')+1;
const matches = [...input.matchAll(/\d+/g)];

const sum = matches.reduce((acc, {index, 0:n}) => {
  const [l,r,t,b] = [-1,n.length+1,-LEN,+LEN];
  const f = input.slice(index+t+l,index+t+r) + input.slice(index+l,index+r) + input.slice(index+b+l,index+b+r);
  return acc + n*/[^\d\n.]/.test(f);
}, 0);

console.log(sum);

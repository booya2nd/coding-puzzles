const input = require('fs').readFileSync('input.txt', 'utf8').trim().match(/^\d+/gm).map(Number)
const LEN = input.length, L = arr => arr.length;
const p1 = input.splice(0,LEN/2), p2 = [...input];

while(L(p1) && L(p2)) {
  const [n1, n2] = [p1.shift(), p2.shift()];
  n1 > n2 ? p1.push(n1,n2) : p2.push(n2,n1);
}

r = [p1,p2].map(nums => nums.reduce((acc, n, i) => acc+n*(LEN-i),0));
console.log(r);

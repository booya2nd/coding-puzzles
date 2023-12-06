const input = require('fs').readFileSync('input.txt', 'utf8');

const LEN = input.indexOf('\n')+1;
const matches = [...input.matchAll(/\d+/g)];
const SPECIAL = /[^\d\n.]/;

const map = {};
matches.forEach(({index, 0:n}) => {
  const [l,r,t,b] = [-1,n.length+1,-LEN,+LEN];
  const f = [
    input.substring(index+t+l,index+t+r),
    input.substring(index+l,index+r),
    input.substring(index+b+l,index+b+r)
  ];
  if (SPECIAL.test(f.join(''))) {
    for (let i = 0; i < f.length; i++) {
      const y = i-1; // -1,0,1
      const xm = f[i].match(SPECIAL);
      if (xm) {
        const sCharIndex = index + y*LEN + xm.index;
        (map[sCharIndex] ||= []).push(n);
        break;
      }
    }
  }
});

console.log(
  Object.values(map)
    .filter(nums => nums.length >= 2)
    .reduce((sum, nums) =>
      nums.reduce((prod, num) => prod*num)
      ,0)
);

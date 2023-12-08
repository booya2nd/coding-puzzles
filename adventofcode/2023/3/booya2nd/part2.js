const input = require('fs').readFileSync('input.txt', 'utf8');

const LEN = input.indexOf('\n')+1;
const numbers = [...input.matchAll(/\d+/g)];
const map = Object.fromEntries([...input.matchAll(/[^\d\n.]/g)].map(({index}) => [index, []]));

numbers.forEach(({index, 0:n}) => {
  [-LEN,0,LEN].forEach(y => [...Array(n.length+2)].forEach((_,x) =>
    map[index-1+x+y] && map[index-1+x+y].push(n)
  ));
});

console.log(
  Object.values(map).reduce((sum, nums) =>
    sum + (nums.length < 2 ? 0 : nums.reduce((prod, num) => prod*num))
  ,0)
);

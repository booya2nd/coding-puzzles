const input = require('fs').readFileSync('input.txt', 'utf8');

const LEN = input.indexOf('\n')+1;
const matches = [...input.matchAll(/\d+/g)]; // [{0,index,}]

let nums = {true:0, false:0, total:0};
const sum = matches.reduce((acc, m) => {
  const {index, 0:n} = m;
  const [l,r,t,b] = [-1,n.length+1,-LEN,+LEN];

  const f = input.substring(index+t+l,index+t+r) + input.substring(index+l,index+r) + input.substring(index+b+l,index+b+r);
  const _valid = /[^\d\n.]/.test(f);

  nums[_valid]++;
  nums.total++;

  const _f = [input.substring(index+t+l,index+t+r), input.substring(index+l,index+r), input.substring(index+b+l,index+b+r)];
  console.log('// =====',_valid ? '✅' : '❌', n,'=====');
  console.log('// #',nums.total);
  console.log(_f.join('\n'));
  console.log('// whole block:');
  console.log({index, n});
  console.log(input.substring(
    Math.floor((index-LEN)/LEN)*LEN, Math.ceil((index+LEN)/LEN)*LEN
  ));
  console.log('\n');

  return  acc + n*_valid;
}, 0);

console.log('expected 1217', nums);
console.log(sum);

/*

FIND connected numbers
- find a number (digit sequence)
- check surroundings
  .????.
  .?35?.633.
  .????.
- if it has a Special Char, add to parts list
  - making a grid via 2d array and operate on that via x/y coords
  - cooler use fixed length per line to calculate virtual position
    l = index - 1;
    r = index + x.length;
    t = index - LEN;
    b = index + LEN;
 */

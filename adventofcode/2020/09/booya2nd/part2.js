const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n').map(Number);


function hasMatchingSum(num, lookup) {
  for (let i = 0; i < lookup.length; i++) {
    for (let j = i+1; j < lookup.length; j++) {
      const sum = lookup[i] + lookup[j];
      if (sum === num) return true
    }
  }
}

function run(preamble, list){
  const pre = list.splice(0, preamble);
  const index = list.findIndex((num) => {
    const found = hasMatchingSum(num*1, pre);
    if (!found) return true;
    pre.shift(); pre.push(num);
  });
  return { index: index+preamble, number: list[index] }
}

const { index, number } = run(25, [...input]);
const invalidNumber = number*1;
let i,j;
a:for (i = 0; i < index; i++) {
  let contiguousSum = input[i];
  for (j = i+1; j < index; j++) {
    contiguousSum += input[j];
    if (contiguousSum > invalidNumber) break;
    if (contiguousSum === invalidNumber) break a;
  }
}

const contigSum = input.slice(i,j+1).sort((a,b) => a-b);

console.log(
  contigSum.shift() + contigSum.pop()
);


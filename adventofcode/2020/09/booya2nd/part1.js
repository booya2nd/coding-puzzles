const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');


function hasMatchingSum(num, lookup) {
  for (let i = 0; i < lookup.length; i++) {
    for (let j = i+1; j < lookup.length; j++) {
      const sum = lookup[i]*1 + lookup[j]*1;
      if (sum === num) return true
    }
  }
}

function run(preamble, list){
  const pre = list.splice(0, preamble);
  return list.find((num) => {
    const found = hasMatchingSum(num*1, pre);
    if (!found) return true;
    pre.shift(); pre.push(num);
  });

}

console.log(
  run(25, [...input])
)

const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n\n')

let [rules, yours, nearbys] = input;
rules=rules.split('\n').reduce((acc, str) => {
  const [,name, ...ranges] = str.match(/(\w+): (\d+-\d+) or (\d+-\d+)/);
  acc[name] = ranges.map(range => range.split('-').map(Number));
  return acc;
}, {});
yours=yours.split('\n').slice(1).map(nums => nums.split(',').map(Number));
nearbys=nearbys.split('\n').slice(1).map(nums => nums.split(',').map(Number));
const rulesArr = Object.values(rules);

function checkRule(rule, num){
  const [min, max] = rule;
  return num >= min && num <= max;
}

const result = nearbys.flatMap(ticket => {
  return ticket.filter((num) =>
    !rulesArr.some(rules =>
      rules.some(rule => checkRule(rule, num))
    )
  )
})

console.log(result.reduce((a,b) => a+b));



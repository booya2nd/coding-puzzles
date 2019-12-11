const { readFileSync } = require('fs');
const { join } = require('path');

const input = readFileSync(join(__dirname, 'input.txt'), 'utf8').trim().split(',').map(Number);
const goal = 19690720;
// input[1] = 12;
// input[2] = 2;

const calculate = (op, x, y) => {
  if (op === 1) return x + y;
  if (op === 2) return x * y;
  throw Error('Invalid Sign');
};

const getPosition0 = values => values.slice(0).reduce((acc, curr, i, arr) => {
  if (i % 4) return acc;
  if (curr === 99) {
    arr.splice(1);
    return acc;
  }

  const [op, val1, val2, pos] = arr.slice(i, i + 4);
  acc[pos] = calculate(op, acc[val1], acc[val2]);
  return acc;
}, values)[0];

const value = (() => {
  for (let noun = 0; noun < 99; noun++) {
    for (let verb = 99; verb > 0; verb--) {
      const tempInput = [...input];
      tempInput[1] = noun;
      tempInput[2] = verb;
      
      if (getPosition0(tempInput) === goal) {
        return 100 * noun + verb;
      }
    }
  }
})();

console.log(value)
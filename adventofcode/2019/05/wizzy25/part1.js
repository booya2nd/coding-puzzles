const { readFileSync } = require('fs');
const { join } = require('path');

const input = readFileSync(join(__dirname, 'input.txt'), 'utf8').trim().split(',').map(Number);

const operations = {
  1: (pos, x, y) => {
    input[pos] = x + y;
    return 4;
  },
  2: (pos, x, y) => {
    input[pos] = x * y;
    return 4;
  },
  3: (pos) => {
    input[pos] = 1;
    return 2;
  },
  4: (pos) => {
    console.log(input[pos]);
    return 2;
  }
}

const shouldTerminate = val => val === 99;

let i = 0;
while (i < input.length) {
  const op = Number(input[i].toString().slice(-2));
  if (shouldTerminate(op)) break;

  const [fpMode = 0, spMode = 0, tpMode = 0] = input[i].toString().slice(0, -2).split('').reverse().map(Number);
  let pos, val1, val2;

  const values = input.slice(i + 1, i + 4)
  if (op === 1 || op === 2) {
    val1 = fpMode ? values[0] : input[values[0]];
    val2 = spMode ? values[1] : input[values[1]];
    pos = values[2];
  } else {
    pos = values[0];
  }

  const increment = op in operations ? operations[op](pos, val1, val2) : 1;
  i += increment;
}

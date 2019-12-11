const { readFileSync } = require('fs');
const { join } = require('path');

const input = readFileSync(join(__dirname, 'input.txt'), 'utf8').trim().split(',').map(Number);

const operations = {
  1: (i, pos, x, y) => {
    input[pos] = x + y;
    return  i + 4;
  },
  2: (i, pos, x, y) => {
    input[pos] = x * y;
    return i + 4;
  },
  3: (i, pos) => {
    input[pos] = 5;
    return i + 2;
  },
  4: (i, pos) => {
    console.log(input[pos]);
    return i + 2;
  },
  5: (i, pos, x, y) => {
    return x ? y : i + 3;
  },
  6: (i, pos, x, y) => {
    return !x ? y : i + 3;
  },
  7: (i, pos, x, y) => {
    input[pos] = x < y ? 1 : 0;
    return i + 4;
  },
  8: (i, pos, x, y) => {
    input[pos] = x === y ? 1 : 0;
    return i + 4;
  },
}

const shouldTerminate = val => val === 99;

let i = 0;
while (i < input.length) {
  const op = Number(input[i].toString().slice(-2));
  if (shouldTerminate(op)) break;

  const [fpMode = 0, spMode = 0, tpMode = 0] = input[i].toString().slice(0, -2).split('').reverse().map(Number);
  let pos, val1, val2;

  const values = input.slice(i + 1, i + 4)
  if (op === 1 || op === 2 || op === 7 || op === 8) { // 3 params
    val1 = fpMode ? values[0] : input[values[0]];
    val2 = spMode ? values[1] : input[values[1]];
    pos = values[2];
  } else if (op === 3 || op === 4) { // 1 param
    pos = values[0];
  } else { // 2 params
    val1 = fpMode ? values[0] : input[values[0]];
    val2 = spMode ? values[1] : input[values[1]];
  }

  const newI = op in operations ? operations[op](i, pos, val1, val2) : 1;
  i = newI;
}

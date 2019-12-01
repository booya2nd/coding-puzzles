const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8').trim();

const data = input.split('\n');
let result = 0;
for(let num of data){
  result += (num / 3 | 0) - 2;
}

console.log(result); // 3226488

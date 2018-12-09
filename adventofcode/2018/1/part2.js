let path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

let input = data.split('\n');
let fq = 0, res = [0];

for (let i = 0; i < input.length; i++) {
  fq += parseInt(input[i], 0);
  if (res.indexOf(fq) == -1)  res.push(fq);
  else break;
  if (i == (input.length -1)) i = -1;
}
console.log('fq',fq);

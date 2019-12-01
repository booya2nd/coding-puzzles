const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8').trim();

const data = input.split('\n');
const requiredFuel = (mass) => {
  const fuel = (mass / 3 | 0) - 2;
  return fuel >= 8 // everything below would give 0 or less
    ? fuel + requiredFuel(fuel)
    : fuel;
};

let result = 0;
for(let num of data){
  result += requiredFuel(num);
}

console.log(result); // 4836845

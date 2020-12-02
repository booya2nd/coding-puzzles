const input = require('fs').readFileSync('input.txt', 'utf8').split('\n');
const nums = input.map(Number);

for (let i=0, l=nums.length; i<l; i++) {
  for (let j=i+1; j<l; j++) {
    if (nums[i]+nums[j] === 2020) {
      console.log(nums[i] * nums[j]);
      break;
    }
  }
}


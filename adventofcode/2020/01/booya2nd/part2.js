const input = require('fs').readFileSync('input.txt', 'utf8').split('\n');
const nums = input.map(Number);

a:for (let i=0, l=nums.length; i<l; i++) {
  for (let j=i+1; j<l; j++) {
    for (let k=j+1; k<l; k++) {
      if (nums[i]+nums[j]+nums[k] === 2020) {
        console.log(nums[i]*nums[j]*nums[k]);
        break a;
      }
    }
  }
}

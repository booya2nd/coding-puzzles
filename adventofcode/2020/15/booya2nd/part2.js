const input = require('fs').readFileSync('input.txt', 'utf8').trim().split(',')

const MAX_TURNS = 30000000, nums = {}; let recent; input.forEach(add);
function add(num, turn){
  const arr = (nums[num] ||= new Array(2));
  arr[1] = arr[0]; arr[0] = turn+1;
  recent = num;
}

// ❗❗❗❗❗❗ will run for 7m 17s 988 straight!
console.time();
for(let turn=input.length; turn<MAX_TURNS; turn++) {
  const r = nums[recent];
  const t0 = r[0];
  const t1 = r[1];
  const v = t1 ? t0-t1: 0;
  add(v, turn)
}
console.timeEnd();


console.log(recent);

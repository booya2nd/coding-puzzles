const input = require('fs').readFileSync('input.txt', 'utf8').trim().split(',')

const MAX_TURNS = 2020, nums = {}; let recent; input.forEach(add);
function add(num, turn){
  (nums[num] ||= []).unshift(turn+1);
  recent = num;
}

for(let turn=input.length; turn<MAX_TURNS; turn++) {
  const [t0,t1] = nums[recent] ?? [];
  add(t1 ? t0-t1 : 0, turn);
}

console.log(recent);


const [t, sched] = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');
const num = sched
  .split(',')
  .filter(isFinite)
  .map(n => [n*1-(t%(n*1)), n*1])
  .sort(([a],[b])=>b-a)
  .pop()

console.log(num, num[0] * num[1]);


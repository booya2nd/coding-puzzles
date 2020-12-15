const [,sched] = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');
const busnums = sched.split(',').map(Number);

let time = 0, incr = 1;
busnums.map((bus, offs) => {
  if (!bus) return;
  while ((time + offs) % bus) time += incr;
  incr *= bus;
});

console.log(time);


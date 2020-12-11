const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');
const jolts = input.map(Number).sort((a,b) => a-b);

// tribonacci like ...
console.log(
  jolts.reduce((acc, n) => {
    acc[n] = (acc[n - 3] || 0) + (acc[n - 2] || 0) + (acc[n - 1] || 0);
    return acc;
  }, [1]).pop()
)


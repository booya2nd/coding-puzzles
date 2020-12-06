const input = require('fs').readFileSync('input.txt', 'utf8').trim().split(/\n\n/);

const results = input.map((group) => {
  const temp = new Set(group
    .split('\n')
    .flatMap(line => line.split(''))
  )
  return temp.size;
});

console.log(
  results.reduce((a,b) => a+b)
)

const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const result = input.reduce((sum, l) => {
  const counts = [...l.matchAll(/(\d+) (\w+)/g)].reduce(
    (acc, [_,n,c]) => Object.assign(acc, {[c]: Math.max(acc[c]??0, n)}), {}
  );
  return sum + Object.values(counts).reduce((p,c)=>p*c)
}, 0);

console.log(result);


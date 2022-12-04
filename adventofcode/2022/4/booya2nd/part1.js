const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n').map(l => l.split(','))

let sum = 0;
for(let l of input) {
    const [a,b] = l.map(r => r.split('-').map(Number));

    const aInB = a[0] >= b[0] && a[1] <= b[1];
    const bInA = b[0] >= a[0] && b[1] <= a[1];

    sum += (aInB || bInA) * 1
}

console.log(sum);



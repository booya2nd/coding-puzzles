const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n').map(l => l.split(','));


let sum = 0;
for(let l of input) {
    const [a,b] = l.map(r => r.split('-').map(Number));

    const included = a[0] <= b[1] && a[1] >= b[0];

    if (included) ++sum;
}

console.log(sum);



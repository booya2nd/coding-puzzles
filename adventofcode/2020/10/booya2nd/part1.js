const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');
const jolts = input.map(Number);

const diffs = jolts
.sort((a,b) => a-b)
.map((jolt, i) => jolt - (jolts[i-1] ?? 0));
diffs.push(3); // device is always 3 higher than the highest 🤷‍

const counts = diffs.reduce((acc, diff) => (acc[diff]++, acc), {1:0, 2:0, 3:0} );
console.log(counts, counts[1] * counts[3]);

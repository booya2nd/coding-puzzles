const text = require('fs').readFileSync('input.txt', 'utf8').trim();
// map map map 🤮
const [order, updates] =  text.split('\n\n').map(s => s.split('\n').map(l => l.split(/[,|]/).map(Number)))

let result = 0;
for (const u of updates) {
  const pos={}; u.map((p,i)=>pos[p]=i);
  result += !order.some(([a, b]) => pos[a] > pos[b]) ? u[u.length/2|0] : 0
}

console.log(result)


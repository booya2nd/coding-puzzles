const text = require('fs').readFileSync('input.txt', 'utf8').trim();
// map map map 🤮
const [order, updates] = text.split('\n\n').map(s => s.split('\n').map(l => l.split(/[,|]/).map(Number)));
const g={}; order.map(([a,b])=>(g[a]||={_:a})[b]=g[b]||={_:b});
const s={}; Object.values(g).map(n=>s[n._]=Object.keys(n).length);

let result = 0;
for (const u of updates) {
  let x; const ok = u.every(n=>x=(x??g)[n]);
  if (!ok) {
    const _s={}; u.map(_ => _s[_]=Object.keys(g[_]).filter(_=>u.includes(+_)).length);
    result += u.sort((a,b) => _s[b]-_s[a])[u.length/2|0];
  }
}

console.log(result);


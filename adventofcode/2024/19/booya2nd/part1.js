const text = require('fs').readFileSync('input.txt','utf8').split('\n\n');
const avail = text[0].match(/\w+/g).reduce((a,t) =>((a[t[0]]||=[]).push(t),a),{});
const wish = text[1].match(/\w+/g);

const valid = w => {
  let l=w.length, v=Array(l+1).fill(0);v[0]=1;
  let heap=[0];

  while (heap.length) {
    const pos=heap.shift();
    if (pos === l) return 1;

    const c=avail[w[pos]];
    if (!c) continue;

    for (let a of c) {
      const npos=pos+a.length;
      if (npos<=l && w.slice(pos,npos)===a && !v[npos]++) heap.push(npos);
    }
  }

  return 0;
}

console.log(wish.filter(valid).length);

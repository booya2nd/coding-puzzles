const text = require('fs').readFileSync('input.txt','utf8').split('\n\n');
const avail = text[0].match(/\w+/g).reduce((a,t)=>((a[t[0]]||=[]).push(t),a),{});
const wish = text[1].match(/\w+/g);

const count = w => {
  let l=w.length, v=Array(l+1).fill(0),c;v[0]=1;

  for (let pos=0; pos<l; pos++) {
    if (!v[pos] || !(c=avail[w[pos]])) continue;
    for (let a of c) {
      const npos=pos+a.length;
      if (npos<=l && w.slice(pos,npos)===a) v[npos]+=v[pos];
    }
  }

  return v[l];
};

x=100;z=[];while(x-->0) {
  const t0=performance.now();
  wish.map(count).reduce((a, b) => a + b);
  z.push(performance.now()-t0);
}
z=z.sort((a,b)=>a-b).slice(1,-1);
console.log({
  runs: z.length+2,
  avg: z.reduce((a, b) => a + b) / z.length,
  min: z.at(0),
  max: z.at(-1)
});
console.log(wish.map(count).reduce((a,b)=>a+b));

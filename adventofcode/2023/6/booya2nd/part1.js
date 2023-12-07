const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const [ts,ds] = text.split('\n').map(l => l.match(/\d+/g));

const result = ts.reduce((p,t,i) =>
  p*[...Array(t-1)].map((_,_c) => {
    let s=_c+1,r=t-s,d=s*r; // (s)peed=(c)harge,(r)acetime,(d)istance
    return d;
  }).filter(d => d>ds[i]).length
,1);

console.log(result);

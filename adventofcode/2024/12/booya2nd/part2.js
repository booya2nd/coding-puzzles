let text=require('fs').readFileSync('input.txt', 'utf8').trim();
let l=text.length,i=l,w=text.indexOf('\n')+1,r={},v={},dir=[-w,1,w,-1];

while(i-->0){
  if (v[i] || text[i] === '\n') continue;
  let c=text[i],a=0,p=0,s=[i],pos,n,ev={},ec=0;

  while (s.length) {
    if (v[pos=s.pop()]) continue;
    v[pos]=1;a++;
    for (let d of dir) {
      ((n=pos+d)<0 || pos>=l || text[pos]==='\n' || text[n]!==c)
        ? ev[[d,n]] || (ec+=(ev[[d,n]]=1,dir.reduce((sum,o)=>sum-(ev[[d,n+o]]||0),1)))
        : !v[n]&&s.push(n);
    }
  }

  r[c]=(r[c]||0)+a*ec;
}

console.log(Object.values(r).reduce((s,v)=>s+v));
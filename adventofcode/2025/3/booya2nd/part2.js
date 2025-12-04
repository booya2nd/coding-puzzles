const text=require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

let r=0n;
text.map(n=>{
  let s='',k=12,i,j=0,m,l=n.length,w;
  for(;k>0;k--){
    i=j,m=0,w=l-k;
    for(;i<=w;i++)
      if (n[i]>m) { m=n[i];j=i; }
    s+=m;j++;
  }
  r+=BigInt(s);
});

console.log(r+'')
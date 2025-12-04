const text=require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

let r=0;
text.map(n=>{
  let i=0,j,m=0,l=n.length;
  for(;i<l;i++)
    for(j=i+1;j<l;j++)
      m=Math.max(m,+n[j]+n[i]*10);
  r+=m;
});

console.log(r);
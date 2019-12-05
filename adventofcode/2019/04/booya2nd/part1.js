const source="136760-595730";
let [i,l]=source.split('-'),c=0;
const r=/(\d)\1/,v=(n,b=!0)=>([...n+''].reduce((p,n)=>(b&=n>=p,n)),!!b);
for(;i*1<=l*1;i++)r.test(i)&&v(i)&&c++;
console.log(c);

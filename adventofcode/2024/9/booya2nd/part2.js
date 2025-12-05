const text = require('fs').readFileSync('input.txt', 'utf8').trim();

const [f,n,s] = [{},[],[]];
[...text.matchAll(/(\d)(\d)?/g)].forEach(([_,_n,_s],i)=>{
  i&&(f[+_n]||=[]).unshift(i);
  n.push(+_n);
  s.push(+_s||0);
});
// n = [2,3,1,3,2,4,4,3,4,2]
// s = [3,3,3,1,1,1,1,1,0,0]

/*
00...111...2...333.44.5555.6666.777.888899
0099.111...2...333.44.5555.6666.777.8888..
0099.1117772...333.44.5555.6666.....8888..
0099.111777244.333....5555.6666.....8888..
00992111777.44.333....5555.6666.....8888..
 */

let res=[], i=0;
for (;n.length>0;i++) {
  res.push(...Array(n[i]).fill(i));
  let spaces = s[i], match;
  while(spaces-->0){
    match = f[spaces+1]?.shift();
    if (match) { n[match] = '.'; break; }
  }
  res.push(...Array(n[i]).fill(match ?? '.'));

  console.log(res+'');
}



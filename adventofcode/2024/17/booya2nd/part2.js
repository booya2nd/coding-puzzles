let text = require('fs').readFileSync('input.txt','utf8').trim();
let A,B,C,out,i,[_A,_B,_C,...program]=text.match(/(\d+)/g).map(BigInt);
const coop = { 4:_=>A, 5:_=>B, 6:_=>C, 7:null };
const combo = op => coop[op]?.() ?? op;
const o = [
  /* 0: adv */ op => A=A/2n**combo(op),
  /* 1: bxl */ op => B=B^op,
  /* 2: bst */ op => B=combo(op)%8n,
  /* 3: jnz */ op => A===0n || (i=op-2n),
  /* 4: bxc */ op => B=B^C,
  /* 5: out */ op => out.push(combo(op)%8n),
  /* 6: bdv */ op => B=A/2n**combo(op),
  /* 7: cdv */ op => C=A/2n**combo(op),
];

let off=1925235n,j=0n,programt=program+'',track={};
// while(++j<100_000_000n) {
  [A,B,C] = [_A,_B,_C];
  i=0n,out=[];A=off+j;
  for (; i < program.length; i += 2n) {
    const {[i]: instr, [i + 1n]: op} = program;
    o[instr](op);
  }
  const outt = out+'';
  if (programt.includes(outt)) {
    (track[outt]||=[]).push(j+off);
    console.log(track);
  }
  if (out+'' === programt) { console.log(off+j);}
// }

console.log(out+'');
// 2,4,1,7,7,5,0,3,4,4,1,7,5,5,3,0

// 2,4 -> B = A%8
// 1,7 -> B = B^7
// 7,5 -> C = A/2**B
// 0,3 -> A = A/2**3
// 4,4 -> B = B^C
// 1,7 -> B = B^7
// 5,5 -> out B%8
// 3,0 -> !A jmp 0






/*
0 = Array(1) [7n]
1 = Array(1) [1n]
2 = Array(1) [2n]
3 = Array(1) [3n]
4 = Array(2) [4n, 5n]
5 = Array(1) [6n]
0,3 = Array(2) [24n, 31n]
3,4 = Array(2) [34n, 42n]
4,4 = Array(1) [37n]
5,5 = Array(1) [54n]
3,0 = Array(2) [58n, 60n]
5,0,3 = Array(2) [198n, 250n]
0,3,4 = Array(5) [277n, 279n, 338n, 341n, 343n]
3,4,4 = Array(1) [298n]
7,5,5 = Array(2) [433n, 434n]
5,3,0 = Array(4) [470n, 482n, 483n, 486n]
7,5,0,3 = Array(1) [2000n]
0,3,4,4 = Array(3) [2386n, 2389n, 2391n]
5,0,3,4 = Array(4) [2704n, 2710n, 2728n, 2744n]
1,7,5,5 = Array(1) [3470n]
5,5,3,0 = Array(7) [3760n, 3766n, 3857n, 3862n, 3865n, 3889n, 3894n]
5,0,3,4,4 = Array(4) [19088n, 19094n, 19112n, 19128n]
7,5,0,3,4 = Array(3) [21682n, 21827n, 21955n]
4,1,7,5,5 = Array(1) [27763n]
7,5,5,3,0 = Array(8) [30081n, 30129n, 30130n, 30898n, 30923n, 31113n, 31153n, 31154n]
7,5,0,3,4,4 = Array(3) [152754n, 152899n, 153027n]
7,7,5,0,3,4 = Array(3) [173457n, 174620n, 175644n]
1,7,5,5,3,0 = Array(6) [240649n, 240654n, 241038n, 247390n, 248910n, 249230n]
7,7,5,0,3,4,4 = Array(3) [1222033n, 1223196n, 1224220n]
1,7,7,5,0,3,4 = Array(4) [1387656n, 1387662n, 1396960n, 1405152n]
4,1,7,5,5,3,0 = Array(5) [1925235n, 1928307n, 1979123n, 1991280n, 1991283n]
 */
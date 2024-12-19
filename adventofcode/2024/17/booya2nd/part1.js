let text = require('fs').readFileSync('input.txt','utf8').trim();
let [A,B,C,...program] = text.match(/(\d+)/g).map(n=>+n);
let i=0,out=[];
const coop = { 4:_=>A, 5:_=>B, 6:_=>C, 7:null };
const combo = op => coop[op]?.() ?? op;
const o = [
  op => A=(A/2**combo(op))|0, //adv
  op => B^=op, //bxl
  op => B=combo(op)%8, //bst
  op => A===0 || (i=op-2), //jnz
  op => B=B^C, //bxc
  op => out.push(combo(op)%8), //out
  op => B=(A/2**combo(op))|0, //bdv
  op => C=(A/2**combo(op))|0, //cdv
];

for (;i<program.length;i+=2){
  const { [i]:instr, [i+1]:op } = program;
  o[instr](op);
}
console.log(out+'');
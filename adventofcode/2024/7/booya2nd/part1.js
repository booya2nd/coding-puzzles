let text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const ops = [(a,b)=>a+b,(a,b)=>a*b];
let result = 0;
for (const l of input) {
  const [eq,...nums] = l.match(/\d+/g);
  let ol=ops.length, nl=nums.length-1, opsi=ol**nl, x=false;
  while(opsi-->0 && !x) {
    const op = opsi.toString(ol).padStart(nl,'0').split('').map(i=>ops[i]);
    let r=+nums[0];
    for (let i=0; i<op.length; i++) {
      r = op[i](r, +nums[i+1])
      if (r > +eq) break;
    }
    if (r === +eq) {
      result += r;
      break;
    }
  }
}

console.log(result);

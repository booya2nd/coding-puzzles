const text = require('fs').readFileSync('input.txt', 'utf8');
const input = text.trim().split('\n\n');

const wires = {};
const n = n => isNaN(n*1)?wires[n]:()=>n*1;
[...input[0].matchAll(/(\w+): (\d)/g)].map((w,v) => wires[w] = n(v));
const CREATORS = {
  AND: (a,b) => function AND(){ return n(a)() & n(b)() },
  OR: (a,b) => function OR(){ return n(a)() | n(b)() },
  XOR: (a,b) => function XOR(){ return n(a)() ^ n(b)() },
}

function create(op, a, b){
  const fn = CREATORS[op](a,b);
  return () => fn.result ??= fn()
}

for (let line of input[1].split('\n')) {
  const [_,a,op,b,c] = line.match(/(\w+?) (\w+?) (\w+?) -> (\w+)/);
  wires[c] ||= create(op, a, b);
}

console.log(
  Object.entries(wires).filter(([w,v])=>w.startsWith('z'))
    .map(([_,fn])=>fn())
);
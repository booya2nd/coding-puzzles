const text = require('fs').readFileSync('input.txt', 'utf8');
const input = text.trim().split('\n');

const wires = {};
const $ = n => n & 2**16-1;
const n = n => isNaN(n*1) ? wires[n] : () => n*1;
const CREATORS = {
  LSHIFT: (a,b) => function LSHIFT(){ return $(n(a)() << b*1) },
  RSHIFT: (a,b) => function RSHIFT(){ return $(n(a)() >> b*1) },
  AND: (a,b) => function AND(){ return $(n(a)() & n(b)()) },
  OR: (a,b) => function OR(){ return $(n(a)() | n(b)()) },
  NOT: (_,b) => function NOT(){ return $(~n(b)()) },
  SET: (a,_) => function PASS(){ return $(n(a)()) }
}

function create(op, a, b){
  const fn = CREATORS[op](a,b);
  return () => fn.result ??= fn()
}

for (let line of input) {
  const [,a,op = 'SET',b,wire] = line.match(/(?:([a-z0-9]+) )?(?:([A-Z]+) )?(?:([a-z0-9]+) )?-> ([a-z]+)/);
  wires[wire] ||= create(op, a, b);
}

const result = wires.a();
console.log(result);
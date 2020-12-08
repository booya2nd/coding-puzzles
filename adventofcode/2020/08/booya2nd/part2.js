const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

function run({ input, acc = 0, step= 0, mod=x=>x }){
  const CACHE = [];

  const OPS = {
    nop: () => { return },
    acc: val => { acc += val },
    jmp: (val, step) => { return val + step }
  }

  let line;
  while((line = input[step]) && !CACHE.includes(step)) {
    CACHE.push(step);

    let [, opcode, val] = line.match(/(\w+) (.\d+)/);
    ({ opcode, val, step, acc } = mod({ opcode, val: val*1, step, acc, CACHE, }));
    step = OPS[opcode](val*1, step) ?? step+1;
  }

  return {
    acc,
    step,
    exit: input.length-step?1:0,
    CACHE
  }
}

// mark all  'nop' / 'jmp'
const OPCODE_SWAPS = {'nop':'jmp','jmp':'nop'};
const MATCH_OPCODE = /nop|jmp/;
const swapSteps = input.map((line, step) => MATCH_OPCODE.test(line) && step).filter(isFinite);

// tryout all swaps one by one until one finishes with exit: 0
while(swapSteps.length) {
  const swapStep = swapSteps.shift();
  const mod = (data) => {
    let { opcode, step } = data;
    if (step === swapStep) opcode = OPCODE_SWAPS[opcode];
    return { ...data, opcode }
  }
  const result = run({ input, mod });
  if (result.exit === 0) { console.log(result.acc); break; }
}

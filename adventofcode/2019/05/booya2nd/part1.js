const source = require('fs').readFileSync('input.txt', 'utf8').trim().split(',');
const INPUT = 1;

function operate(state) {
  const MODES = {
    0: int => state[int],
    1: int => int,
  };
  const $ = (value, mode=0) => MODES[mode](value);
  const OPS = {
    1: (arg1, arg2, [stor]) => { state[stor] = $(...arg1) + $(...arg2) },
    2: (arg1, arg2, [stor]) => { state[stor] = $(...arg1) * $(...arg2) },
    3: ([stor]) => { state[stor] = INPUT },
    4: ([arg1]) => { console.log(state[arg1]) }
  };

  for (let i=0; state[i] !== 99; i++) {
    // let debug = state.slice(Math.max(i-10,0),i+4);
    // debug.splice(debug.length-4,1,'>'+state[i]);
    // console.log(i,': ...'+debug.join(' ')+'...');
    const opinstr = [...(state[i]+'')];
    const opcode = opinstr.splice(-2).join('');
    const op = OPS[opcode*1];
    // console.log(JSON.stringify(state.slice(0,i+1)));
    // console.log(`('pos ', ${i}, 'instr ', '${opinstr}', 'opcode', ${opcode})`);
    if (op) {
      const argValues = state.slice(i+1, i+op.length+1);
      const argModes = opinstr.reverse();
      const args = argValues.map((value,i) => [value, argModes[i]*1 || 0]);
      op(...args);
      i += op.length;
    }
  }
  return state;
}

console.log(operate(source.map(Number))); // 6745903

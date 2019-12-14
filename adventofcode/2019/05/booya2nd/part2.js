const source = require('fs').readFileSync('input.txt', 'utf8');

function operate(sequence, input) {
  const state = sequence.trim().split(',').map(Number);
  const MODES = {
    0: int => state[int],
    1: int => int,
  };
  const $ = (value, mode= 0) => MODES[mode](value);
  const OPS = {
    1: (arg1, arg2, [stor]) => { state[stor] = $(...arg1) + $(...arg2) },
    2: (arg1, arg2, [stor]) => { state[stor] = $(...arg1) * $(...arg2) },
    3: ([stor]) => { state[stor] = input },
    4: ([arg1]) => { console.debug(state[arg1]) },
    5: (arg1, jmp) => $(...arg1) && $(...jmp),
    6: (arg1, jmp) => !$(...arg1) && $(...jmp),
    7: (arg1, arg2, [stor]) => { state[stor] = ($(...arg1) < $(...arg2))*1 },
    8: (arg1, arg2, [stor]) => { state[stor] = ($(...arg1) == $(...arg2))*1 }
  };

  for (let i=0; state[i] !== 99;) {
    const opinstr = [...(state[i]+'')];
    const opcode = opinstr.splice(-2).join('');
    const op = OPS[opcode*1];
    let increment = i+1;
    if (op) {
      const argValues = state.slice(i+1, i+op.length+1);
      const argModes = opinstr.reverse();
      const args = argValues.map((value,i) => [value, argModes[i]*1 || 0]);
      increment = op(...args) || i + op.length;
    }
    i = increment;
  }
  return state;
}

operate(source, 5); // 9168267

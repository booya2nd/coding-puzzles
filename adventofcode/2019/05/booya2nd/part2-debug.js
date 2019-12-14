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
    console.log('---------------------');
    //console.log(state+'');
    let debug = state.slice(Math.max(i-10,0),i+10);
    debug.splice(debug.length-4,1,'>'+state[i]);
    console.log(i,': '+debug.join(' '));
    const opinstr = [...(state[i]+'')];
    const opcode = opinstr.splice(-2).join('');
    const op = OPS[opcode*1];
    // console.log(JSON.stringify(state.slice(0,i+1)));
    // console.log(`('pos ', ${i}, 'instr ', '${opinstr}', 'opcode', ${opcode})`);
    let increment = i+1;
    if (op) {
      const argValues = state.slice(i+1, i+op.length+1);
      const argModes = opinstr.reverse();
      const args = argValues.map((value,i) => [value, argModes[i]*1 || 0]);
      console.log(`   OPS[${opcode}](${args.map(JSON.stringify)})`);
      increment = op(...args) || i + op.length;
    }
    i = increment;
  }
  return state;
}

console.log(operate(source, 5)); // 9168267

// tests
[
['3,9,8,9,10,9,4,9,99,-1,8', 8, 1],
['3,9,8,9,10,9,4,9,99,-1,8', 9, 0],
['3,9,8,9,10,9,4,9,99,-1,8', 7, 0],
['3,9,7,9,10,9,4,9,99,-1,8', 7, 1],
['3,9,7,9,10,9,4,9,99,-1,8', 8, 0],
['3,9,7,9,10,9,4,9,99,-1,8', 9, 0],
['3,3,1108,-1,8,3,4,3,99', 8, 1],
['3,3,1108,-1,8,3,4,3,99', 9, 0],
['3,3,1108,-1,8,3,4,3,99', 7, 0],
['3,3,1107,-1,8,3,4,3,99', 7, 1],
['3,3,1107,-1,8,3,4,3,99', 8, 0],
['3,3,1107,-1,8,3,4,3,99', 9, 0],
['3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', 0, 0],
['3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', 1, 1],
['3,3,1105,-1,9,1101,0,0,12,4,12,99,1', 0, 0],
['3,3,1105,-1,9,1101,0,0,12,4,12,99,1', 1, 1],
].forEach(([seq, input, result] ) => {
  console.log('\n\n\n####################');
  const out = [], x = console.debug;
  console.debug = (...args) => (out.push(args), console.log(...args));
  operate(seq, input);
  console.debug = x;
  console.assert(result+'' === out+'');
});

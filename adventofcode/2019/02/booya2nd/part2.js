var state=document.body.textContent.trim().split(',').map(Number);
var FIND = 19690720;
var OPS = {
  1: (i, state, arg1, arg2, stor) => ((state[stor] = state[arg1] + state[arg2]), i+3),
  2: (i, state, arg1, arg2, stor) => ((state[stor] = state[arg1] * state[arg2]), i+3),
  99: () => Infinity,
  x: i => i+1,
};
function operate(state) {
  for (let i=0; i in state;) {
    let [opnr, arg1, arg2, stor] = state.slice(i,i+4);
    let {[opnr]: op = OPS.x} = OPS;
    i = op(i, state, arg1, arg2, stor);
  }
  return state[0];
}

loop:for (var noun=0; noun<=99; noun++) {
  for (var verb=0; verb<=99; verb++) {
    const interstate = [...state];
    interstate[1] = noun;
    interstate[2] = verb;
    if (operate(interstate) === FIND) {
      console.log(100 * noun + verb); // 8018
      break loop;
    }
  }
}

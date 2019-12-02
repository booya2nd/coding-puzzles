var state=document.body.textContent.trim().split(',').map(Number);
state[1]=12;state[2]=2;

((state) => {
  const ops = {
    1: (i, arg1, arg2, stor) => ((state[stor] = state[arg1] + state[arg2]), i+3),
    2: (i, arg1, arg2, stor) => ((state[stor] = state[arg1] * state[arg2]), i+3),
    99: () => Infinity,
    x: i => i+1,
  };
  for (let i=0; i in state;) {
    let [opnr, arg1, arg2, stor] = state.slice(i,i+4);
    let {[opnr]: op = ops.x} = ops;
    i = op(i, arg1, arg2, stor);
  }
  return state[0];
})(state);


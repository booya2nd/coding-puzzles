(() => {

  let REG = Array(4);
  const OPCODES = {
    addr: (A,B,C) => { REG[C] = REG[A] + REG[B] },
    addi: (A,B,C) => { REG[C] = REG[A] + B },
    mulr: (A,B,C) => { REG[C] = REG[A] * REG[B] },
    muli: (A,B,C) => { REG[C] = REG[A] * B },
    banr: (A,B,C) => { REG[C] = REG[A] & REG[B] },
    bani: (A,B,C) => { REG[C] = REG[A] & B },
    borr: (A,B,C) => { REG[C] = REG[A] | REG[B] },
    bori: (A,B,C) => { REG[C] = REG[A] | B },
    setr: (A,B,C) => { REG[C] = REG[A] },
    seti: (A,B,C) => { REG[C] = A },
    gtir: (A,B,C) => { REG[C] = A > REG[B] ? 1 : 0 },
    gtri: (A,B,C) => { REG[C] = REG[A] > B ? 1 : 0 },
    gtrr: (A,B,C) => { REG[C] = REG[A] > REG[B] ? 1 : 0 },
    eqir: (A,B,C) => { REG[C] = A === REG[B] ? 1 : 0 },
    eqri: (A,B,C) => { REG[C] = REG[A] === B ? 1 : 0 },
    eqrr: (A,B,C) => { REG[C] = REG[A] === REG[B] ? 1 : 0 }
  };
  const OPCODE_NUMBERS = Array(15);

  const sample = 0&&`
  Before: [3, 2, 1, 1]
  9 2 1 2
  After:  [3, 2, 2, 1]
  `;
  const input = (sample || document.body.textContent).trim();

  function parse(_, before, op, after){
    return {
      regBefore: before.split(', ').map(Number),
      op: op.split(' ').map(Number),
      regAfter: after.split(', ').map(Number)
    }
  }

  let part1HasAtLeast3Matches = 0;

  const INPUT_SAMPLES_REGEX = /Before:\s*\[(.*)]\s*(.*)\s*After:\s*\[(.*)]/g;
  input.replace(INPUT_SAMPLES_REGEX, (...args) => {
    const {regBefore, op: [opNum, ...opArgs], regAfter} = parse(...args);
    const matches = Object.entries(OPCODES)
    .filter(([opcodeName, operation]) => {
      REG = regBefore.slice();
      operation(...opArgs);
      const matches = REG+'' === regAfter+'';
      if (matches){
        const opcodenums = OPCODE_NUMBERS[opNum] || (OPCODE_NUMBERS[opNum] = new Set());
        opcodenums.add(opcodeName);
      }
      return matches;
    });
    matches.length >= 3 && part1HasAtLeast3Matches++;
  });

  console.log(part1HasAtLeast3Matches);
})();

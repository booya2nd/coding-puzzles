const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const instr = text.split('\n').map(l => l.split(' '))

const INSPECT_SIGNALS = [20,60,100,140,180,220];

const log = [];
for (let cycle=1, X=1; instr.length; cycle++) {
    const [cmd, arg] = instr.shift();
    if (cmd === 'addx') { X=(log[cycle++]=X)+arg*1 }
    log[cycle]=X;
}

const sum = INSPECT_SIGNALS.map(s => log[s-1] * s).reduce((a,b)=>a+b);

console.log(sum);

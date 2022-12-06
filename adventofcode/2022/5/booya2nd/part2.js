const text = require('fs').readFileSync('input.txt', 'utf8').trimEnd();
const [layout,moves] = text.split('\n\n').map(part => part.split('\n'));
const CHR_WIDTH = '[X] '.length;

// store (and transpose) parsed crates
const crates = [];
layout.slice(0,-1).forEach((line, row) => {
    const values = line.match(/\w| {3,4}/g);
    for(let i=0; i<line.length; i+=CHR_WIDTH) {
        const col = i/CHR_WIDTH;
        const v = values[col].trim();
        v && (crates[col] ||= []).unshift(v);
    }
});

// move the crates
moves.forEach((moveCmd) => {
    const [, amount, from, to] = moveCmd.match(/move (\d+) from (\d+) to (\d+)/);
    const picked = crates[from-1].splice(-amount,amount);
    crates[to-1].push(...picked);
});

console.log(crates.map(stack => stack.at(-1)).join(''));

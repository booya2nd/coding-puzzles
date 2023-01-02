const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const instr = text.split('\n').map(l => l.split(' '))

let X=1; const log = [];
while (instr.length) {
    const [cmd, arg] = instr.shift();
    log.push(X);
    if (cmd === 'addx') { log.push(X); X+=arg*1; }
}

const SCREEN_W = 40;
const SPRITE_X = '###'.length/2|0;

while(log.length){
    console.log(
        log.splice(0,SCREEN_W)
            .map((X,px) => Math.abs(px-X)<=SPRITE_X ? '#' : '.')
            .join('')
    );
}

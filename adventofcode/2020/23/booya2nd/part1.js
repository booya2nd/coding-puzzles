const input = require('fs').readFileSync('input.txt', 'utf8').trim();
let cups = input.split('').map(Number);

let MOVES = 10;
for (let i=0; i<MOVES; i++) {
  const cur = cups[i];
  console.log(`-- move ${i+1} --`);
  console.log(`cups: ${cups.map((n,j)=>i===j?'('+n+')':n)}`);
  const picks = [...Array(3)].map((_,j)=>cups[(i+j+1)%cups.length]);
  cups = cups.filter(n=>!picks.includes(n));
  console.log(`pick up: ${picks}`);
  let dest = cur;
  while (true) {
    (dest -= 1) < 1 && (dest = 9);
    if (!picks.includes(dest)) break;
  }
  console.log(`destination: ${dest}`,'\n\n');
  cups.splice(dest,0,...picks); // insertion logic seems to be more complicated; but dont get it yet
}

console.log(cups);

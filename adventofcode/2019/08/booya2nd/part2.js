const source = require('fs').readFileSync('input.txt', 'utf8');
const WIDTH = 25, HEIGHT = 6, SIZE = WIDTH*HEIGHT;
const COLORS = ['⬛','⬜',''];

const input = [...source.trim()].map(Number);
const layers = input.length / SIZE;
let output = ``;
for (let i=0; i<SIZE; i++) {
  i%WIDTH === 0 && (output += '\n');
  for(let l=0; l<layers; l++){
    const color = COLORS[input[l*SIZE+i]];
    if (color){ output += color; break; }
  }
}

console.log(output); // RKHRY

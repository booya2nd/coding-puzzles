const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

const chrAtPos = (line, pos) => line[pos % line.length]

const steps = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2]
];


const hits = steps.map(([right, down]) => {
  let hits = 0;
  console.log('=========')
  for(let y=0, ymax=input.length, step=0; y<ymax; y+=down, step++) {
    const line = input[y];
    const hit = chrAtPos(line, right*step);
    console.log(y+1, hit, '|| ',line);
    if (hit === '#') hits++;
  }
  return hits;
});

console.log(hits);
console.log(hits.reduce((a,b) => a*b, 1))

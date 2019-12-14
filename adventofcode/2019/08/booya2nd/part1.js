const source = require('fs').readFileSync('input.txt', 'utf8');
const WIDTH = 6, HEIGHT = 25, SIZE = WIDTH*HEIGHT;

const input = [...source.trim()].map(Number);
const layers = [];
input.forEach((color, i) => {
  const l=i/SIZE|0;
  const layer  = (layers[l] || (layers[l] = {}));
  ++layer[color] || (layer[color]=1);
});

const [{1: ones, 2: twos}] = layers.sort((a,b) => a[0]-b[0]);
console.log(ones*twos); // 2375

let text = require('fs').readFileSync('input.txt','utf8');
let w=text.indexOf('\n')+1, S=text.indexOf('S'), E=text.indexOf('S'), D=[[0,-w],[1,0],[0,w],[-1,0]];
let M = [
  { offs: d => D[d], d: 0, c: 1 },
  { offs: d => [0, 0], d: 3, c: 1000 },
  { offs: d => [0, 0], d: 1, c: 1000 }
];

const dijkstra = start => {
  let costs={[[S,1]]:0}, heap=[[0,S,1]];
  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    let [cost, i, dir] = heap.shift();
    if (costs[[i, dir]] < cost) continue;
    for (let {offs, d, c} of M) {
      let o = offs(dir), nd = (dir + d) % 4;
      let ni = i + o[0] + o[1];
      if (text[ni] === '#' && (o[0] || o[1])) continue;
      let newCost = cost + c;
      let key = [ni, nd];
      if (!costs[key] || newCost < costs[key]) {
        costs[key] = newCost;
        heap.push([newCost, ni, nd]);
      }
    }
  }
  return costs;
}

// 1) Distances from S
let distStart = dijkstra(S);
// 2) Distances from E (like "reverse" search), or just treat E as "start"
let distEnd   = dijkstra(E);

// find the bestCost from S->E:
let bestCost = Infinity;
for (let d=0; d<4; d++) {
  let c = distStart[[E,d]];
  if (c !== undefined && c < bestCost) bestCost = c;
}

0;
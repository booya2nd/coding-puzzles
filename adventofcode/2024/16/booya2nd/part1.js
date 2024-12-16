let text = require('fs').readFileSync('input.txt','utf8');
let w=text.indexOf('\n')+1, S=text.indexOf('S'), D=[[0,-w],[1,0],[0,w],[-1,0]];
let dist={[[S,1]]:0}, heap=[[0,S,1]];
let M = [
  { offs: d => D[d], d: 0, c: 1 },
  { offs: d => [0, 0], d: 3, c: 1000 },
  { offs: d => [0, 0], d: 1, c: 1000 }
];

while (heap.length) {
  heap.sort((a,b)=>a[0]-b[0]);
  let [cost, i, _dir] = heap.shift();
  if (text[i] === 'E') { console.log(cost); break; }
  if (dist[[i,_dir]] < cost) continue;

  for (let { offs, d, c } of M) {
    let o=offs(_dir), nd = (_dir + d) % 4;
    let ni = i + o[0] + o[1];
    if (text[ni] === '#' && (o[0] || o[1])) continue;
    let newCost = cost + c;
    let key = [ni, nd];
    if (!dist[key] || newCost < dist[key]) {
      dist[key] = newCost;
      heap.push([newCost, ni, nd]);
    }
  }
}
const text = require('fs').readFileSync('input.txt','utf8');
const _input = [...text.matchAll(/(\d+),(\d+)/g)];

let i=_input.length;
outer:while (i-->0) {
  console.log(i);
  const input = _input.slice(0, i);
  const map = [];
  input.map(([_, x, y]) => map[[x, y]] = '#');
  const w = 70, S = [0, 0], E = [w, w], D = [[1, 0], [0, 1], [-1, 0], [0, -1]]; map[S] = 0;
  let heap = [[0, S]];

  while (heap.length) {
    // console.clear();
    // const debug = [...Array(w+1)].map((_,y,a)=>a.map((_,x)=>map[[x,y]]?.toString(36)??'.').join('')).join('\n');
    // console.log(debug);
    heap.sort((a, b) => a[0] - b[0]);
    let [cost, pos] = heap.shift();
    if (pos == E + '') { console.log(i,_input[i][0]); break outer; }
    if (map[pos] < cost) continue;

    for (let d of D) {
      let npos = [pos[0] + d[0], pos[1] + d[1]], [nx, ny] = npos, newCost = cost + 1;
      if (nx < 0 || nx > w || ny < 0 || ny > w || map[npos] === '#') continue;
      if (!(npos in map) || newCost < map[npos]) {
        map[npos] = newCost;
        heap.push([newCost, npos]);
      }
    }
  }
}
let text = require('fs').readFileSync('input.txt','utf8');
let w=text.indexOf('\n')+1, S=text.indexOf('S'), E=text.indexOf('E'), D=[-w,1,w,-1];

const debug = (cheat, pos) => {
  //console.clear();
  console.log('------------------');
  const debug = [...text];
  debug[pos]='o';
  const [[p,d]=[]]=Object.values(cheat);
  debug[p]=1;
  debug[p+d]=2;
  console.log(debug.join(''));
}

const race = () => {
  let dist={[S]: 0}, heap=[[0, S]];
  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    let [cost, pos] = heap.shift();
    if (pos === E) return cost
    if (dist[pos] < cost) continue;

    for (let d of D) {
      let npos = pos + d, newCost = cost + 1;
      if (text[npos] === '#') continue;
      if (!dist[npos] || newCost < dist[npos]) {
        dist[npos] = newCost;
        heap.push([newCost, npos]);
      }
    }
  }
}

const races = [race({})];
const walls=[...text.matchAll(/#|\d/g)].slice(w,-w).map(({index:i})=>i).filter(i=>(i+2)%w && i%w);
walls.map(wpos => {[1,w].map(d => {
  races.push(
    race({[wpos]:1})
  );
})});
console.log(races.slice(1).map(t=>races[0]-t).filter(Number).reduce((a,t)=>((a[t]||=[]).push(t),a),{}));
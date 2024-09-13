const text = require('fs').readFileSync('input.txt', 'utf8');
const input = text.trim().split('\n');

const DISTANCES = {};
for (const line of input) {
  const [,a,b,d] = line.match(/(\w+) to (\w+) = (\d+)/);
  (DISTANCES[a]||={})[b] = d*1;
  (DISTANCES[b]||={})[a] = d*1;
}

// list of all locations
const LOCATIONS = Object.keys(DISTANCES);
const ROUTES = (function getPermutations(arr){
  return arr.length === 0 ? [[]] : arr.flatMap(
    (val, i) => getPermutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(perm => [val, ...perm])
  )
})(LOCATIONS);

const dist = ROUTES.map(locs => locs.reduce((a,loc,i) => a + (DISTANCES[loc]?.[locs[i+1]] ?? 0),0))
dist.sort((a,b) => a-b);

console.log(dist.at(-1));
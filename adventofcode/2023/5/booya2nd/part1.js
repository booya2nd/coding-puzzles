const text = require('fs').readFileSync('input.txt', 'utf8').trim();

const [_seedstxt, ...groupstxt] = text.split('\n\n');
const _seeds = _seedstxt.match(/\d+/g).map(Number);
const groups = groupstxt.map(_m => _m.split('\n').slice(1).map(n => n.match(/\d+/g).map(Number)));

const locs = _seeds.map(_seed => {
  return groups.reduce((loc, maps) => {
    const [d,s] = maps.find(([,s,r]) => loc >= s && loc < s+r) || [0,0];
    return loc += d-s;
  }, _seed);
});

console.log(Math.min(...locs));

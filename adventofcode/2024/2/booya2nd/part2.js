const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const validate = lvs => {
  const x = lvs.slice(0,-1).map((v,i,a,x) => [Math.abs(x=lvs[i+1]-v),+(x>0),v]);
  return x.every(([d,s]) => s===x[0][1] && (d>0 && d<4));
}

const result = input.filter(line => {
  const lvs = line.split(' ').map(n => +n);
  return validate(lvs) || lvs.some((_,i) => validate(lvs.toSpliced(i,1)));
});
console.log(result.length);
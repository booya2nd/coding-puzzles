const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const s = 'one|two|three|four|five|six|seven|eight|nine';
const map = Object.fromEntries(s.split('|').map((w,i)=>[w,i+1+'']));

const r = `\\d|${s}`;
function match(s, a){
  const {index, 0:x} = s.match(r)||{};
  x && a.push(x) && match(s.slice(index+1), a);
  return a;
}

const result = input.reduce((s,l)=> {
  const m = match(l, []);
  const [a,b] = [m.at(0), m.at(-1)];
  return s + ((map[a]??a) + (map[b]??b))*1;
}, 0);


console.log(result);

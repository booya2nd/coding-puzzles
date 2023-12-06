const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const s = 'one|two|three|four|five|six|seven|eight|nine';
const map = Object.fromEntries(s.split('|').map((w,i)=>[w,i+1+'']));
const r = new RegExp(s,'g');

const result = input.reduce((s,line)=> {
  let l=line;
  while((line=line.replace(r,x=>map[x]+x.at(-1)))!=l){l=line};
  const m = l.match(/\d/g);
  return s + (m.at(0)+m.at(-1))*1
}, 0);


console.log(result);

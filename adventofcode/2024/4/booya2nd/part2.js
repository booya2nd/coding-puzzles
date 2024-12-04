const text = require('fs').readFileSync('input.txt', 'utf8').trim();

let w = text.indexOf('\n')+1,count=0;
for (let i=0; i<text.length; i++) {
  if (text[i] !== 'S' && text[i] !== 'M') continue;
  const x = [
    text[i]+text[i+w+1]+text[i+w*2+2],
    text[i+2]+text[i+w+1]+text[i+w*2],
  ];
  const c = x.filter(s => +/MAS|SAM/.test(s));
  count += c.length === 2;
}

console.log(count);
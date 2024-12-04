const text = require('fs').readFileSync('input.txt', 'utf8').trim();

let w = text.indexOf('\n')+1,count=0;
for (let i=0; i<text.length; i++) {
  if (text[i] !== 'A') continue;
  const x = [text[i-w-1]+text[i+w+1], text[i-w+1]+text[i+w-1]];
  const c = x.filter(s => s === 'SM' || s === 'MS');
  count += c.length === 2;
}

console.log(count);
const text = require('fs').readFileSync('input.txt', 'utf8').trim();

let w = text.indexOf('\n')+1,count=0;
for (let i=0; i<text.length; i++) {
  if (text[i] !== 'S' && text[i] !== 'X') continue;
  const x = [
    text.substring(i,i+4),
    text[i]+text[i+w]+text[i+w*2]+text[i+w*3],
    text[i]+text[i+w+1]+text[i+w*2+2]+text[i+w*3+3],
    text[i]+text[i+w-1]+text[i+w*2-2]+text[i+w*3-3],
  ];

  count += x.filter(s => /XMAS|SAMX/.test(s)).length;
}


console.log(count);
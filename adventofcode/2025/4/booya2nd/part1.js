let text = require('fs').readFileSync('input.txt', 'utf8').trim();
const w = text.indexOf('\n')+1;

console.log([...text.matchAll('@')].filter(({index:i})=>
  [-w-1,-w,-w+1,-1,1,w-1,w,w+1].filter(d=>text[i+d]==='@').length<4
).length)

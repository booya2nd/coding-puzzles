let t = require('fs').readFileSync('input.txt','utf8').split('\n');
let o=[...t.pop().matchAll(/[+*] */g)],c;
c=o.map(({'0':o,index:i})=>eval(t.map(x=>x.slice(i,i+o.length).trim()).join(o[0]))).join('+');
console.log(eval(c));
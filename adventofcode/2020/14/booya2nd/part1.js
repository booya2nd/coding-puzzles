const input = require('fs').readFileSync('input.txt', 'utf8').trim();
const chunks = input.replace(/(mask = )(.*)/g,'$1"$2"').split('\n');

let mask = ''; const mem = new Proxy([], {
  set(arr, i, v){
    const val = [...(v*1).toString(2).padStart(36, '0')];
    mask.replace(/1|0/g, (flag, i) => val[i] = flag);
    return arr[i] = parseInt(val.join(''),2);
  }
})
chunks.forEach(str => eval(str));
console.log(mem.reduce((a,b)=>a+b));


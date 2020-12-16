const input = require('fs').readFileSync('input.txt', 'utf8').trim();
const chunks = input.replace(/(mask = )(.*)/g,'$1"$2"').split('\n');

let mask = ''; const mem = new Proxy({}, {
  set(stor, i, v){
    const addr = [...(i*1).toString(2).padStart(36, '0')], X = [];
    mask.replace(/1|X/g, (flag, i) => {
      flag === 'X' && X.push(i)
      addr[i] = flag;
    });

    // generate adresses, store X pos -> count of Xs as binary, count 0000...nnnn and replace X with 0/1
    const count = 2**X.length;
    [...Array(count)].forEach((_,i) => {
      let newAddr = [...addr], iBin = i.toString(2).padStart(X.length, '0');
      [...iBin].forEach((bit, pos) => newAddr[X[pos]] = bit);
      newAddr = parseInt(newAddr.join(''), 2);
      stor[newAddr] = v;
    });
  }
});

chunks.forEach(str => eval(str));
console.log(Object.values(mem).reduce((a,b) => a+b))


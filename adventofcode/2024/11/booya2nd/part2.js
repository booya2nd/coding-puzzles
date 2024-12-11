const text = require('fs').readFileSync('input.txt', 'utf8').trim();
let stones={};text.split(' ').map(s=>stones[s]=(stones[s]||0)+1);

let blinks = 75;
while (blinks-- > 0) {
  let _stones = {}, l;
  Object.entries(stones).forEach(([stone, c]) => {
    l=stone.length;
    switch (true) {
      case stone==0: _stones[1] = (_stones[1]||0) + c; break;
      case l%2==0:
        const [_l,_r] = [+stone.slice(0,l/2),+stone.slice(l/2)];
        _stones[_l] = (_stones[_l]||0) + c;
        _stones[_r] = (_stones[_r]||0) + c;
        break;
      default: _stones[stone*2024] = (_stones[stone*2024]||0) + c;
    }
  });
  stones = _stones;
}

console.log(Object.values(stones).reduce((a, b)=>a+b));
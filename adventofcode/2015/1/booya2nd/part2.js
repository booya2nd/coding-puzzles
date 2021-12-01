const input = require('fs').readFileSync('input.txt', 'utf8').trim();
const result = [...input].reduce((r, c,i) => {
  c==='(' ? r++ : r--;
  !~r && console.log(i+1);
  return r;
}, 0);
console.log(result);

const input = require('fs').readFileSync('input.txt', 'utf8').trim();
const result = [...input].reduce((r, c) => c==='(' ? r+1 : r-1, 0);
console.log(result);

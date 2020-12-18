const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n')


function _parse(str, strat){
  let oldStr = str, newStr;
  while(true){
    newStr = strat(oldStr);
    // console.log(strat.name, '\n :::',oldStr,'\n ::>',newStr);
    if (oldStr === newStr) break;
    oldStr = newStr;
  }
  return newStr;
}

function sumTerm(str) {
  return str.replace(/\d+ \+ \d+/,  eval)
}
function prodTerm(str) {
  return str.replace(/\d+ \* \d+/,  eval)
}

function calc(str) {
  let result = str;
  while (/[+]/.test(result)) {
    _parse(result, str => {
        result = _parse(result, sumTerm); // solve all A+B
        result = _parse(result, (str) =>
          str.replace(/\([^()+]+\)/g, prodTerm) // solve all (A*B)
        );
        result = result.replace(/\((\d+)\)/g, '$1') // resolve (1234) -> 1234
    })
  }
  return eval(result) // solve all A*B*(C)*D
}

console.log(
  input.map(calc).reduce((a,b) => a*1+b*1)
)



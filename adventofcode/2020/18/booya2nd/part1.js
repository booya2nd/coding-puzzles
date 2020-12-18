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

function evalTerm(str) {
  return str.replace(/\d+ \D \d+/,  eval);
}
function replInner(str) {
  return str.replace(/\([^()]+?\)/g, evalTerm);
}
function parseOuter(str) {
  return _parse(str, replInner).replace(/\((\d+)\)/g, '$1');
}
function calcLine(str) {
  const flatTerms = _parse(str,  parseOuter);
  return _parse(flatTerms, evalTerm);
}


console.log(
  input.map(calcLine).reduce((a,b) => a*1+b*1)
);

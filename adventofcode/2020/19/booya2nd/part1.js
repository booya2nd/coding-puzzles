const [_rules, _str] = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n\n')

const parsedRules = _rules
.replace(/\d+: /g,'').trim().split('\n')
.map(line =>
  line.split(' | ')
  .map(rule => rule.match(/\w/g))
);

function isValid(str, ruleIndex = '0'){
  const ORrules = parsedRules[ruleIndex];
  console.group(`isValid("${str.join('')}", ${ruleIndex})`, JSON.stringify(ORrules));
  const r = ORrules.some(ANDrules => {
    // console.log(':: :: OR');
    return ANDrules.every(x => {
      // console.log(':: :: :: AND');
      if (isNaN(x*1)) {
        console.log(x,'===',str[0]);
        return x === str[0]
      } else {
        return isValid(str, x)
      }
    }) && str.splice(0,1)
  });
  console.groupEnd();
  return r;
};

console.log(
isValid([...'ababbb']))


0&&console.log(
  _str.split('\n').filter(str => isValid([...str]))
);

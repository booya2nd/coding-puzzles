const [_rules, _str] = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n\n')

const parsedRules = _rules.trim().split('\n').reduce((acc, line) => {
  const [,i,rules] = line.match(/^(\d+): (.*)/);
  acc[i] = rules.split(' | ').map(rule => rule.match(/\w+/g));
  return acc;
}, []);

console.log = x => x;
function check(str, ruleIndex = 0) {
  const disjuncts = parsedRules[ruleIndex];
  console.group(`isValid("${str}", ${ruleIndex})`, disjuncts.map(x=>x.join(' ')));
  const ok = disjuncts.some( conjuncts => {
    return conjuncts.every( rule => {
      const isRef = rule in parsedRules;
      if (isRef) {
        console.log('... goto ',rule);
        const { ok, left } = check(str, rule);
        if (ok) str = left;
        return ok;
      } else {
        const matches = rule === str[0];
        console.log('... comp ', rule, '===', str[0], matches ? '✅ ' : '❌ ');
        matches && (str = str.slice(1), console.log(`... str is now "${str}"`));
        return matches
      }
    })
  });
  console.groupEnd();
  return { ok, left: str, isValid() { return this.ok } }
}

console.info(Object.fromEntries(Object.entries(parsedRules)));


console.info(
  _str.split('\n').filter((str,i) => check(str).isValid())
);

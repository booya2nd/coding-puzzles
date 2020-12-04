const input = require('fs').readFileSync('input.txt', 'utf8').trim().split(/\n\n/);

const entries = input.map(str => {
  const matches = str.replace(/\n/g, ' ').matchAll(/(\w+):([^ ]+)/g)
  return Object.fromEntries([...matches].map(([,key, value]) => [key, value]));
});

const REQUIRED_FIELDS = ['ecl','pid','eyr','hcl','byr','iyr','hgt'];
function isValid(entry){ console.log(entry); return REQUIRED_FIELDS.every(name => name in entry) }

console.log(
entries.filter(isValid).length
)





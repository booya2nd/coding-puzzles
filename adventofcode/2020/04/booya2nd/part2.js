const input = require('fs').readFileSync('input.txt', 'utf8').trim().split(/\n\n/);

const entries = input.map(str => {
  const matches = str.replace(/\n/g, ' ').matchAll(/(\w+):([^ ]+)/g)
  return Object.fromEntries([...matches].map(([,key, value]) => [key, value]));
});

const VALID_EYE_COLORS = 'amb blu brn gry grn hzl oth';
const FIELD_RULES = Object.entries({
  'ecl': (val='') => VALID_EYE_COLORS.includes(val),
  'pid': (val='') => val.length === 9 && isFinite(val*1),
  'eyr': (val='') => val.length === 4 && val*1 >= 2020 && val*1 <= 2030,
  'hcl': (val='') => /^#[0-9a-f]{6}$/.test(val),
  'byr': (val='') => val.length === 4 && val*1 >= 1920 && val*1 <= 2002,
  'iyr': (val='') => val.length === 4 && val*1 >= 2010 && val*1 <= 2020,
  'hgt': (val='') => {
    const [,height, unit] = val.match(/(\d+)(in|cm)/) || [];
    switch (unit){
      case 'in':
        return height*1 >= 59 && height*1 <= 76
      case 'cm':
        return height*1 >= 150 && height*1 <= 193
    }
  }
});
function isValid(entry){
  return FIELD_RULES.every(([name, rule]) => {
    return rule(entry[name])
  })
}

console.log(
  entries.filter(isValid).length
)

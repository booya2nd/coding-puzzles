const input = require('fs').readFileSync('input.txt', 'utf8').trim().split('\n');

/**************** model ****************/
const TYPES = {}

function registerBag([, count, name]) {
  const entry = { name, count: count*1, parent: null, children: [] };
  (TYPES[name] ||= []).push(entry);
  return entry;
}
function addBags([container, ...contains]) {
  container.children.push(...contains);
  contains.forEach(child => child.parent = container);
}
function ignoreNoOther([,,name]){ return name !== 'no other'}

input.forEach((line, i) => {
  const bagDescriptors = line.matchAll(/(?:(\d+) )?(\w+ \w+) bag/g);
  const bags = [...bagDescriptors].filter(ignoreNoOther).map(registerBag);
  addBags(bags);
});

/**************** eval ****************/
function getNestedChildrenCount(name, _result = []) {
  TYPES[name].forEach(({ children }) => {
    let _carry = [];
    if (children.length) _result.push(_carry);
    children.forEach((child) => {
      _carry.push(child.count);
      getNestedChildrenCount(child.name, _carry);
    });
  });
  return _result;
}

// 🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈 so dirty!!
function convertNestedCountToArithExpression(nestedCountArray) {
  return JSON.stringify(nestedCountArray)
  .replace(/\[/g,'(')
  .replace(/\]/g,')')
  .replace(/(\d),\(/g,'$1+$1*(')
  .replace(/,(\d+)/g,'+$1')
}

const nestedChildrenCount = getNestedChildrenCount('shiny gold');
console.log(eval( // 🤣🤣🤣🤣🤣
  convertNestedCountToArithExpression(nestedChildrenCount)
));



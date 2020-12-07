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
function lookupTraverse(name, _result = new Set) {
  TYPES[name].forEach(({ parent }) => {
    const name = parent?.name;
    if (name && !_result.has(name)) {
      _result.add(name);
      lookupTraverse(name, _result);
    }
  });
  return _result;
}

const result = lookupTraverse('shiny gold');
console.log(result.size);

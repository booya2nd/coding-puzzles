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
function getNestedChildrenCount(name) {
  return TYPES[name].reduce((totalCount, { children }) => {
    const subSum = children.reduce((sumChildren, child) => {
      const deepChildCount = getNestedChildrenCount(child.name);
      return sumChildren + child.count + child.count * deepChildCount
    }, 0);
    return totalCount + subSum;
  }, 0);
}

console.log(
  getNestedChildrenCount('shiny gold')
)


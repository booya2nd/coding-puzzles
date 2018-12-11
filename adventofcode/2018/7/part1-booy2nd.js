var debug = `
Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
`;
var input = (debug || document.body.textContent).trim().split('\n');
let nodes = {};

const sortByName = ({name:a},{name:b}) => (a<b && -1) || (a>b && 1) || 0;
const createNode = name => { const node={name, parents:[], children:[], done:false}; return nodes[name]=node; };
input.forEach((line) => {
  const [,parent, child] = line.match(/Step (\w) must be finished before step (\w) can begin./);
  const childNode = nodes[child] || createNode(child);
  const parentNode = nodes[parent] || createNode(parent);

  parentNode.children.push(childNode);
  childNode.parents.push(parentNode);
});


const vRoot = {children: Object.values(nodes).filter(node => !node.parents.length)};
const sortedNodes = [];

(function sort(node){
  const {name='', parents = [], children = [], sorted = false} = node;
  !sorted && children.sort(sortByName) && (node.sorted=true);
  const ready = !parents.length || parents.every(parent => parent.done);
  console.log(
    parents.map(c=>`${c.done?'✅':'✖️'}${c.name}`)+'',
    '<--', name||'start', '-->',
    children.map(c=>`${c.done?'✅':'✖️'}${c.name}`)+''
  );
  if (!node.done && ready) {
    node.done=true;
    name && sortedNodes.push(node);
    children.forEach(sort);
  }
})(vRoot);

console.log(sortedNodes.map(node => node.name).join(''));

console.log({
  vRoot,
  nodes
});



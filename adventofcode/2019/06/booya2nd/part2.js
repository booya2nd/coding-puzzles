const source = require('fs').readFileSync('input.txt', 'utf8');

const input = source.trim().split('\n');
const NODES = {};
function getNode(name) {
  return NODES[name] || (NODES[name] = { name, children: [], path: [] });
}
input.forEach(edge => {
  const [nodeA,nodeB] = edge.split(')').map(getNode);
  nodeA.children.push(nodeB);
});

const {COM,YOU,SAN} = NODES;
// update path;
(function walk(node, comPath = []){
  const { children, name, path } = node;
  node.path.push(...comPath);
  children && children.forEach(child => walk(child, [...comPath, name]))
})(COM);

const sharedPath = YOU.path.filter((name, i) => name === SAN.path[i]);
console.log(
  YOU.path.length - sharedPath.length +
  SAN.path.length - sharedPath.length
);

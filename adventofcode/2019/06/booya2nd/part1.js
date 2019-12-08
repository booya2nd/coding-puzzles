const source = require('fs').readFileSync('input.txt', 'utf8');

const input = source.trim().split('\n');
const NODES = {COM: []};
function createNode(name, child) {
  const node = NODES[name] || (NODES[name] = []);
  node.push(child);
  return node
}
input.forEach(edge => {
  const [a,b] = edge.split(')');
  createNode(a,b);
});
let count = 1;
(function walk(nodeName, currentDepth=1){
  const {[nodeName]: node} = NODES;
  const { length = 0 } = Object(node);
  count += length-1 + currentDepth-1;
  length && node.forEach(child => walk(child, currentDepth+1))
})('COM');

console.log(count); // 300598

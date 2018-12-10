var input = document.body.textContent.trim().split(' ');
var nodeList = [];

function sum(items, getter = n=>n*1){
  return items.reduce((sum, n) => sum + getter(n), 0)
};
function getMetaNodes(node){
  return node.meta.reduce((acc, i) => acc.concat(node.children[i-1]||[]), [])
}
function valueOf(node) {
  return node.children.length === 0 ? sum(node.meta) : sum(getMetaNodes(node), valueOf);
}

function parseInput(input, parent = null){
  const [childCount, metaCount] = input.splice(0,2);
  const node = { children: [], meta:[], parent };
  nodeList.push(node);
  node.children = [...Array(childCount*1)].map(_ => parseInput(input, node));
  node.meta = input.splice(0, metaCount*1);
  return node;
}
var rootNode = parseInput(input);
valueOf(rootNode); // 16653

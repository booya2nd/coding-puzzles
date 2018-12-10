var input = document.body.textContent.trim().split(' ');
var nodeList = [];

function parseInput(input, parent = null){
  const [childCount, metaCount] = input.splice(0,2);
  const node = { children: [], meta:[], parent };
  nodeList.push(node);
  node.children = [...Array(childCount*1)].map(_ => parseInput(input, node))
  node.meta = input.splice(0, metaCount*1);
  return node;
}
parseInput(input);

var sum = (items, getter = n=>n*1) => items.reduce((sum, n) => sum + getter(n), 0);
sum(nodeList, node => sum(node.meta)); // 41555

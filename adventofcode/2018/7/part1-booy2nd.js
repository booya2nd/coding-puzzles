((input) => {
  const list = {}, resolved = {};
  const createNode = name => list[name]||(list[name]={name, deps:[]});
  input.trim().split('\n')
  .forEach((line) => {
    const [, dep, node] = line.match(/Step (\w) must be finished before step (\w) can begin./);
    createNode(node).deps.push(createNode(dep));
  });

  const getSortedList = () => Object.keys(list).sort().map(key => list[key]);
  const isResolved = node => !node.deps.length || node.deps.every(dep => dep.name in resolved);
  const next = () => getSortedList().filter(isResolved)[0];

  let current;
  while(current = next()){
    resolved[current.name] = current;
    delete list[current.name];
  }

  console.log(Object.keys(resolved).join(''))
})(document.body.textContent);


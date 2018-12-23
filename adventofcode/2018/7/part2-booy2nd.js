((input) => {
  const list = {}, resolved = {};
  const createNode = name => list[name]||(list[name]={name, deps:[]});
  input.trim().split('\n')
  .forEach((line) => {
    const [, dep, node] = line.match(/Step (\w) must be finished before step (\w) can begin./);
    createNode(node).deps.push(createNode(dep));
  });

  const getSortedList = (list) => Object.keys(list).sort().map(key => list[key]);
  const isResolved = (node) => !node.deps.length || node.deps.every(dep => dep.name in resolved);
  const next = (list) => getSortedList(list).filter(isResolved);

  let tick = 0;
  const nextTick = (tick) => (Object(workers[0]).onTick||tick);
  function worker(node, tick) {
    const onTick = tick + WORKER_TIMEOUT + node.name.charCodeAt(0)-64; // A=1, B=2 ...
    return { result: node.name, onTick} // workers can foresee their timeouts ¯\_(ツ)_/¯
  }
  const WORKER_COUNT = 5, WORKER_TIMEOUT = 60, workers = [];
  const settleWorkers = (workers, tick) => workers.splice(0,
    workers.filter(w => tick >= w.onTick)
    .map(w => resolved[w.result]=w.result)
    .length
  );
  const distributeWork = (workers, next=[], tick) => {
    next.slice(0,WORKER_COUNT-workers.length)
    .map((node) => {
      workers.push(worker(node, tick));
      delete list[node.name];
    });
    workers.sort((a,b) => a.onTick - b.onTick);
  };

  do {
    settleWorkers(workers, tick);
    distributeWork(workers, next(list), tick);
    tick = nextTick(tick);
  } while (workers.length);

  console.log(tick);
})(document.body.textContent);


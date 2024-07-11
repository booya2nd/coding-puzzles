function getPath(connections) {
    const set = new Set();
    for ([a,b] of connections) {
        set.add(b);
        set.delete(a);
    }
    return [...set][0]
}

const r = getPath([['A', 'B'], ['B', 'C'], ['C', 'D']]);
console.log(r === 'D', r);
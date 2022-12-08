const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n');

const sum = arr => arr.reduce((a,b) => a+b, 0);
const Node = (name, size) => ({
    name, p:null, c:{}, size: size*1, isDir: size === 'dir',
    add(n){ n.parent = this; this.c[n.name] = n },
    get total(){ return this.size || sum(Object.values(this.c).map(c => c.total))  },
    walk(cb){ Object.values(this.c).forEach((c,i,arr) => { cb(c,i,arr); c.walk(cb) })},
    filter(predicate){
        const result = [];
        this.walk((n,i,arr) => { predicate(n,i,arr) && result.push(n) });
        return result;
    }
})
const state = {
    lines: input,
    tree: {
        '/': Node('/'),
        get '..'(){ return state.cwd.parent }
    },
    cwd: null
};

const COMMANDS = {
    'cd': (target) => {
        state.cwd = state.tree[target] || state.cwd.c[target];
    },
    'ls': () => {
        const n = state.lines.findIndex(line => line.startsWith('$'));
        const output = state.lines.splice(0, n === -1 ? Infinity : n);
        output.forEach((line) => {
            const [size, name] = line.split(' ');
            state.cwd.add(Node(name, size))
        })
    },
}

while(state.lines.length) {
    const [line] = state.lines.splice(0,1);
    const [,cmd,args] = line.match(/\$ (\w+)(?: (.*))?/);
    COMMANDS[cmd](args);
}

const MAX_DISK_SPACE = 70e6;
const REQ_DISK_SPACE = 30e6;
const freeUpSpace = Math.abs(MAX_DISK_SPACE - REQ_DISK_SPACE - state.tree['/'].total);

console.log(
    state.tree['/']
        .filter(n => n.isDir && n.total >= freeUpSpace)
        .sort((a,b) => a.total - b.total)
        .at(0).total
);

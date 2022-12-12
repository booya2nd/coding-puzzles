const text = require('fs').readFileSync('input.txt', 'utf8').trim();
const input = text.split('\n').map(l => l.split(' '))

const abs = Math.abs;
const T=[0,0];
const H=[0,0];
const h = [];

const POS = { U:[1,1],D:[1,-1],L:[0,-1],R:[0,1] };
for(let [dir,steps] of input) {
    const [i,offs] = POS[dir];
    for(let step=0; step<steps*1; step++) {
        H[i] += offs;
        const [dx,dy] = [H[0]-T[0], H[1]-T[1]];

        dx > 1 && T[0]++;
        dx < -1 && T[0]--;
        dy > 1 && T[1]++;
        dy < -1 && T[1]--;
        abs(dy) > 1 && dx && (T[0]=H[0])
        abs(dx) > 1 && dy && (T[1]=H[1])

        console.log({ dx, dy, H, T});
        h.push(T+'');
    }
}

console.log( new Set(h).size );
